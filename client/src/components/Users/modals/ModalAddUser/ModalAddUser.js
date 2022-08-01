import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Form,
  FormGroup,
  Input
} from "reactstrap";

import { addUser } from "../../../../redux";

const ModalAddUser = ({ isOpen, toggle, addUser }) => {
  // input fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // input handlers
  const handleFullNameChange = e => setFullName(e.target.value);
  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);

  const handleReset = e => {
    e.preventDefault();

    setFullName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (fullName && username && password && password === confirmPassword) {
      addUser({
        fullName,
        username,
        password
      });

      setFullName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add User</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button color="danger" type="reset" onClick={handleReset}>
            Reset
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

ModalAddUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    //
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: newUser => dispatch(addUser(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddUser);
