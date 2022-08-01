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

import { login } from "../../redux";

const ValidationError = ({ error, isOpen, toggle }) => {
  if (error) {
    return (
      <Alert color="danger" isOpen={isOpen} toggle={toggle}>
        {error}
      </Alert>
    );
  }

  return null;
};

const Login = ({ auth, login }) => {
  const [visible, setVisible] = useState(false);
  const [validationError, setValidationError] = useState("");

  // input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // input handlers
  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const onDismiss = () => setVisible(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (username && password) {
      setVisible(false);
      setValidationError("");

      login({
        username,
        password
      });
    } else {
      setVisible(true);
      setValidationError("Please enter all fields");
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="pt-5">
      <h3 className="mb-3">Login</h3>
      <ValidationError
        error={validationError}
        isOpen={visible}
        toggle={onDismiss}
      />
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
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
            <FormGroup className="m-0">
              <Button color="primary" type="submit">
                Login
              </Button>
              <Button color="link" tag={Link} to="/register">
                Create an Account
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
    login: credentials => dispatch(login(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
