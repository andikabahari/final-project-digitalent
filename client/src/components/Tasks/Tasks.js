import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Table, Badge, Button } from "reactstrap";

import {
  ModalAddTask as ModalAdd,
  ModalEditTask as ModalEdit,
  ModalDeleteTask as ModalDelete
} from "./modals";

import { fetchTasks } from "../../redux";

const ButtonAdd = ({ auth, toggle }) => {
  if (auth.isAuthenticated) {
    return (
      <Button color="primary" onClick={toggle} className="mb-2">
        Add Task
      </Button>
    );
  }

  return null;
};

const TableHead = ({ auth }) => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Description</th>
        <th>Completed</th>
        <th>Created By</th>
        {auth.isAuthenticated ? <th /> : null}
      </tr>
    </thead>
  );
};

const TableBody = ({ auth, task, handleEdit, handleDelete }) => {
  return (
    <tbody>
      {task.tasks.map((task, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>
            {task.isCompleted ? (
              <Badge color="success">Yes</Badge>
            ) : (
              <Badge color="warning">No</Badge>
            )}
          </td>
          <td>{task.createdBy ? task.createdBy.fullName : null}</td>
          {auth.isAuthenticated ? (
            <td>
              <Button
                color="success"
                size="sm"
                className="mr-1"
                onClick={() => handleEdit(task)}
              >
                Edit
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => handleDelete(task)}
              >
                Delete
              </Button>
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  );
};

const VModalAdd = ({ auth, isOpen, toggle }) => {
  if (auth.isAuthenticated) {
    return <ModalAdd isOpen={isOpen} toggle={toggle} />;
  }

  return null;
};

const VModalEdit = ({ auth, task, isOpen, toggle }) => {
  if (auth.isAuthenticated) {
    return <ModalEdit task={task} isOpen={isOpen} toggle={toggle} />;
  }

  return null;
};

const VModalDelete = ({ auth, taskId, isOpen, toggle }) => {
  if (auth.isAuthenticated) {
    return <ModalDelete taskId={taskId} isOpen={isOpen} toggle={toggle} />;
  }

  return null;
};

const Tasks = ({ auth, task, fetchTasks }) => {
  const [taskToEdit, setTaskToEdit] = useState({});
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleModalAdd = () => setModalAdd(!modalAdd);
  const toggleModalEdit = () => setModalEdit(!modalEdit);
  const toggleModalDelete = () => setModalDelete(!modalDelete);

  const handleEdit = task => {
    setTaskToEdit(task);
    toggleModalEdit();
  };

  const handleDelete = task => {
    setTaskToEdit(task);
    toggleModalDelete();
  };

  useEffect(() => fetchTasks(), [fetchTasks]);

  return (
    <div>
      <Container className="pt-5">
        <h3 className="mb-4">Tasks</h3>
        <ButtonAdd auth={auth} toggle={toggleModalAdd} />
        <Table responsive striped bordered hover>
          <TableHead auth={auth} />
          <TableBody
            auth={auth}
            task={task}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Table>
      </Container>
      <VModalAdd auth={auth} isOpen={modalAdd} toggle={toggleModalAdd} />
      <VModalEdit
        auth={auth}
        task={taskToEdit}
        isOpen={modalEdit}
        toggle={toggleModalEdit}
      />
      <VModalDelete
        auth={auth}
        taskId={taskToEdit._id}
        isOpen={modalDelete}
        toggle={toggleModalDelete}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    task: state.task
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
