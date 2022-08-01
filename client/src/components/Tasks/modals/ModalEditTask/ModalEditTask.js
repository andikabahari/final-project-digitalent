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

import { updateTask } from "../../../../redux";

const ModalEditTask = ({ isOpen, toggle, task, updateTask }) => {
  // input fields
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

    setTitle(task.title);
    setDescription(task.description);
    setIsCompleted(task.isCompleted);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (title) {
      updateTask({
        title,
        description,
        isCompleted,
        _id: task._id
      });

      toggle();
    }
  };

  useEffect(
    () => {
      setTitle(task.title);
      setDescription(task.description);
      setIsCompleted(task.isCompleted);
    },
    [task]
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              placeholder="Description"
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

ModalEditTask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    //
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTask: task => dispatch(updateTask(task))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEditTask);
