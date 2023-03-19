import React from "react";
import TokenInput from "../TokenInput";
import { Col, Container } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column mt-5">
      <Col className="text-center">
        <h3>
          Enter your username and access token,
          <br />
          then press "Users" to receive data.
        </h3>
      </Col>
      <TokenInput />
    </Container>
  );
};

export default Home;
