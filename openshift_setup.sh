#!/bin/bash

# Set cluster credentials.
CLUSTER_USERNAME=myusername
CLUSTER_PASSWORD=mypassword
CLUSTER_API="https://api.ap46a.prod.ole.redhat.com:6443"

# Set project name.
PROJECT_NAME=myproject

# Login to the cluster.
oc login -u ${CLUSTER_USERNAME} -p ${CLUSTER_PASSWORD} ${CLUSTER_API}

# Create a project.
oc new-project ${PROJECT_NAME}

# Create a PersistentVolumeClaim.
oc apply -f ./k8s/my-pvc.yaml

# Create mongo resources and
# retrieve mongo service's ClusterIP and port.
oc apply -f ./k8s/mongo-secret.yaml
oc apply -f ./k8s/mongo-deployment.yaml
oc apply -f ./k8s/mongo-service.yaml
MONGO_IP=$(oc get svc mongo-service -o json | jq -r '.spec.clusterIP')
MONGO_PORT=$(oc get svc mongo-service -o json | jq -r '.spec.ports[0].port')
MONGO_DB=mern

sleep 60

# Create a new user for "mern" database.
oc exec \
    $(oc get pod -l app=mongo -o name) -- /bin/bash -c \
    "mongo admin -u root -p pass --eval \"db.getSiblingDB('mern').createUser({user: 'user', pwd: 'pass', roles: ['readWrite']})\""

# Set environment variables in nodejs-deployment.yaml and
# create nodejs resources.
sed -i "s/\$MONGO_IP/$MONGO_IP/" ./k8s/nodejs-deployment.yaml
sed -i "s/\$MONGO_PORT/$MONGO_PORT/" ./k8s/nodejs-deployment.yaml
sed -i "s/\$MONGO_DB/$MONGO_DB/" ./k8s/nodejs-deployment.yaml
oc apply -f ./k8s/nodejs-secret.yaml
oc apply -f ./k8s/nodejs-deployment.yaml
oc apply -f ./k8s/nodejs-service.yaml

# Access nodejs service using ClusterIP.
# NODEJS_IP=$(oc get svc nodejs-service -o json | jq -r '.spec.clusterIP')
# NODEJS_PORT=$(oc get svc nodejs-service -o json | jq -r '.spec.ports[0].port')
# NGINX_API="http:\/\/$NODEJS_IP:$NODEJS_PORT"

# Access nodejs service using route. 
oc expose svc/nodejs-service
NODEJS_HOST=$(oc get route nodejs-service -o json | jq -r '.spec.host')
NGINX_API="http:\/\/$NODEJS_HOST"

# Set environment variables in nginx-deployment.yaml and
# create nginx resources.
sed -i "s/\$NGINX_API/$NGINX_API/" ./k8s/nginx-deployment.yaml
oc apply -f ./k8s/nginx-deployment.yaml
oc apply -f ./k8s/nginx-service.yaml

# Expose nginx service.
oc expose svc/nginx-service
