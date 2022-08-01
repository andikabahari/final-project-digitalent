import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Alert,
  Container,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { register } from "../../redux";

const ValidationErrors = ({ errors, isOpen, toggle }) => {
  if (errors.length > 0) {
    return (
      <Alert color="danger" isOpen={isOpen} toggle={toggle}>
        {errors.map((error, index) => (
          <p key={index} className="m-0">
            {error}
          </p>
        ))}
      </Alert>
    );
  }

  return null;
};

const RegisterSuccess = ({ success, isOpen, toggle }) => {
  if (success) {
    return (
      <Alert color="success" isOpen={isOpen} toggle={toggle}>
        Registration success!
      </Alert>
    );
  }

  return null;
};

const Register = ({ auth, register }) => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [dangerVisible, setDangerVisible] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

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

  const onSucessDismiss = () => setSuccessVisible(false);
  const onDangerDismiss = () => setDangerVisible(false);

  const handleReset = e => {
    e.preventDefault();

    setFullName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = e => {
    e.preventDefault();

    const err = [];

    if (!fullName || !username || !password || !confirmPassword)
      err.push("Please input all fields");

    if (password !== confirmPassword) err.push("Password doesn't match");

    if (err.length === 0) {
      register({
        fullName,
        username,
        password
      });

      setValidationErrors([]);
      setRegisterSuccess(true);
      setSuccessVisible(true);
      setDangerVisible(false);

      // reset input fields
      setFullName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setValidationErrors(err);
      setRegisterSuccess(false);
      setSuccessVisible(false);
      setDangerVisible(true);
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="pt-5">
      <h3 className="mb-3">Register</h3>
      <RegisterSuccess
        success={registerSuccess}
        isOpen={successVisible}
        toggle={onSucessDismiss}
      />
      <ValidationErrors
        errors={validationErrors}
        isOpen={dangerVisible}
        toggle={onDangerDismiss}
      />
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
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
            <FormGroup className="m-0">
              <Button color="primary" type="submit" className="mr-1">
                Register
              </Button>
              <Button color="danger" type="reset" onClick={handleReset}>
                Reset
              </Button>
              <Button color="link" tag={Link} to="/login">
                Login Page
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: newUser => dispatch(register(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
