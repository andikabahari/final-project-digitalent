import React from "react";
import { Container } from "reactstrap";

const AppFooter = () => {
  return (
    <footer className="text-muted py-5">
      <Container>
        <div className="float-left">
          Copyright &copy; 2020 <strong>MERN JWT Auth</strong>.
        </div>
        <div className="float-right">
          Made with ❤ by{" "}
          <a href="https://github.com/andikabahari">Andika Bahari</a>.
        </div>
      </Container>
    </footer>
  );
};

export default AppFooter;
