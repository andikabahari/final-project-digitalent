FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY . .
RUN yarn build

FROM nginx:1.22.0-alpine AS production
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf.template /etc/nginx/templates/
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]