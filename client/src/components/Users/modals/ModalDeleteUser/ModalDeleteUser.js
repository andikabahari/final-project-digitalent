import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { deleteUser } from "../../../../redux";

const ModalDeleteUser = ({ isOpen, toggle, userId, deleteUser }) => {
  const handleDelete = () => {
    deleteUser(userId);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
      <ModalBody>Click the "Delete" button below to delete the user.</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ModalDeleteUser.propTypes = {
  userId: PropTypes.string,
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
    deleteUser: userId => dispatch(deleteUser(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDeleteUser);
