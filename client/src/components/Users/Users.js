import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Table, Button } from "reactstrap";

import {
  ModalAddUser as ModalAdd,
  ModalEditUser as ModalEdit,
  ModalDeleteUser as ModalDelete
} from "./modals";

import { fetchUsers } from "../../redux";

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>Full Name</th>
        <th>Username</th>
        <th>Role</th>
        <th />
      </tr>
    </thead>
  );
};

const TableBody = ({ user, handleEdit, handleDelete }) => {
  return (
    <tbody>
      {user.users.map((user, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.fullName}</td>
          <td>{user.username}</td>
          <td>{user.role}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-1"
              onClick={() => handleEdit(user)}
            >
              Edit
            </Button>
            <Button color="danger" size="sm" onClick={() => handleDelete(user)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Users = ({ auth, user, fetchUsers }) => {
  const [userToEdit, setUserToEdit] = useState({});

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleModalAdd = () => setModalAdd(!modalAdd);
  const toggleModalEdit = () => setModalEdit(!modalEdit);
  const toggleModalDelete = () => setModalDelete(!modalDelete);

  const handleEdit = user => {
    setUserToEdit(user);
    toggleModalEdit();
  };

  const handleDelete = user => {
    setUserToEdit(user);
    toggleModalDelete();
  };

  useEffect(() => fetchUsers(), [fetchUsers]);

  if (auth.user.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Container className="pt-5">
        <h3 className="mb-4">Users</h3>
        <Button color="primary" onClick={toggleModalAdd} className="mb-2">
          Add User
        </Button>
        <Table responsive striped bordered hover>
          <TableHead />
          <TableBody
            user={user}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Table>
      </Container>
      <ModalAdd isOpen={modalAdd} toggle={toggleModalAdd} />
      <ModalEdit
        user={userToEdit}
        isOpen={modalEdit}
        toggle={toggleModalEdit}
      />
      <ModalDelete
        userId={userToEdit._id}
        isOpen={modalDelete}
        toggle={toggleModalDelete}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
