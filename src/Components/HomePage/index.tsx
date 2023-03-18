import React from "react";
import { Box } from "@mui/system";
import TokenInput from "../TokenInput";
import { Col, Row } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Row className="justify-content-center align-items-center">
        <Col className="text-center">
          <h3>
            Enter your username and access token,
            <br />
            then press "Users" to receive data.
          </h3>
        </Col>
      </Row>
      <TokenInput />
    </Box>
  );
};

export default Home;
