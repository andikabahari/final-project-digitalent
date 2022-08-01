import React, { useState, useEffect } from "react";
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

import { updateUser } from "../../../../redux";

const ModalEditUser = ({ isOpen, toggle, user, updateUser }) => {
  // input fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  // input handlers
  const handleFullNameChange = e => setFullName(e.target.value);
  const handleUsernameChange = e => setUsername(e.target.value);

  const handleReset = e => {
    e.preventDefault();

    setFullName(user.fullName);
    setUsername(user.username);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (fullName && username) {
      updateUser({
        fullName,
        username,
        _id: user._id
      });

      toggle();
    }
  };

  useEffect(
    () => {
      setFullName(user.fullName);
      setUsername(user.username);
    },
    [user]
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
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

ModalEditUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    //
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEditUser);
