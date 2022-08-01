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

import { addTask } from "../../../../redux";

const ModalAddTask = ({ auth, isOpen, toggle, addTask }) => {
  // input fields
  const createdBy = auth.user._id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // input handlers
  const handleTitleChange = e => setTitle(e.target.value);
  const handleDescriptionChange = e => setDescription(e.target.value);
  const handleIsCompletedChange = e =>
    setIsCompleted(e.target.checked ? true : false);

  const handleReset = e => {
    e.preventDefault();

    setTitle("");
    setDescription("");
    setIsCompleted(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (title) {
      addTask({
        createdBy,
        title,
        description,
        isCompleted
      });

      setTitle("");
      setDescription("");
      setIsCompleted(false);

      toggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Task</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormGroup>
          <FormGroup className="m-0" check>
            <Label check>
              <Input
                type="checkbox"
                checked={isCompleted ? "checked" : ""}
                onChange={handleIsCompletedChange}
              />{" "}
              Mark as Complete
            </Label>
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

ModalAddTask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: newTask => dispatch(addTask(newTask))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddTask);
