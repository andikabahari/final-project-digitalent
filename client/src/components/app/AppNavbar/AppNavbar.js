import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { logout } from "../../../redux";
import logo from "../../../assets/logo.svg";

const WelcomeMessage = ({ auth }) => {
  if (auth.isAuthenticated)
    return (
      <NavbarText className="mr-3">
        <strong>Welcome, {auth.user.fullName}</strong>
      </NavbarText>
    );

  return null;
};

const LinkTasks = () => {
  return (
    <NavItem>
      <NavLink tag={Link} to="/tasks">
        Tasks
      </NavLink>
    </NavItem>
  );
};

const LinkUsers = ({ auth }) => {
  if (auth.isAuthenticated && auth.user.role === "admin")
    return (
      <NavItem>
        <NavLink tag={Link} to="/users">
          Users
        </NavLink>
      </NavItem>
    );

  return null;
};

const LinkLogin = ({ auth }) => {
  if (!auth.isAuthenticated)
    return (
      <NavItem>
        <NavLink tag={Link} to="/login">
          Login
        </NavLink>
      </NavItem>
    );

  return null;
};

const LinkLogout = ({ auth, toggle }) => {
  if (auth.isAuthenticated)
    return (
      <NavItem>
        <NavLink href="#" onClick={toggle}>
          Logout
        </NavLink>
      </NavItem>
    );

  return null;
};

const ModalLogout = ({ auth, isOpen, toggle, handleLogout }) => {
  if (auth.isAuthenticated)
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm Logout</ModalHeader>
        <ModalBody>
          Click the "Logout" button below to end your session.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </ModalFooter>
      </Modal>
    );

  return null;
};

const AppNavbar = ({ auth, logout }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const history = useHistory();

  const handleLogout = () => {
    logout();
    toggleModal();
    toggleNav();
    history.push("/login");
  };

  return (
    <div>
      <Navbar color="dark" dark expand="lg">
        <Container>
          <NavbarBrand tag={Link} to="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="App Logo"
            />{" "}
            MERN JWT Auth
          </NavbarBrand>
          <NavbarToggler onClick={toggleNav} />
          <Collapse isOpen={isNavOpen} navbar>
            <Nav className="ml-auto" navbar>
              <WelcomeMessage auth={auth} />
              <LinkTasks />
              <LinkUsers auth={auth} />
              <LinkLogin auth={auth} />
              <LinkLogout auth={auth} toggle={toggleModal} />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <ModalLogout
        auth={auth}
        isOpen={isModalOpen}
        toggle={toggleModal}
        handleLogout={handleLogout}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavbar);
