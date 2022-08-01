import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container, Button } from "reactstrap";

const Home = () => {
  return (
    <Jumbotron className="m-0">
      <Container>
        <h1 className="display-4">Welcome!</h1>
        <p className="lead">
          This is a simple ReactJS application, featured with JSON Web Token
          authentication system.
        </p>
        <hr className="my-4" />
        <p className="lead">
          <Button color="primary" size="lg" tag={Link} to="/tasks">
            Tasks List
          </Button>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Home;
