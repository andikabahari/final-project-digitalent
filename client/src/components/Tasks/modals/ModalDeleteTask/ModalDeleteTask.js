import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { deleteTask } from "../../../../redux";

const ModalDeleteTask = ({ isOpen, toggle, taskId, deleteTask }) => {
  const handleDelete = () => {
    deleteTask(taskId);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
      <ModalBody>Click the "Delete" button below to delete the task.</ModalBody>
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

ModalDeleteTask.propTypes = {
  taskId: PropTypes.string,
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
    deleteTask: taskId => dispatch(deleteTask(taskId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDeleteTask);
