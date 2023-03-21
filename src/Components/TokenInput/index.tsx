import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess } from "../../features/authSlice";

const TokenInput = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleShowTokenChange = () => {
    setShowToken(!showToken);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && token) {
      const response = await fetch("https://gorest.co.in/public/v2/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


      // yanıt kontrol edilir
      if (response.status === 401) {
        toast.error("Invalid token. Please try again.", {
          position: "top-center",
        });
        setToken("");
        setUsername("");
      } else {
        dispatch(loginSuccess({ currentUser: username, token: token }));

        toast.success(`Welcome ${username}!`, { position: "top-center" });
        setToken("");
        setUsername("");

        return navigate("/users");
      }
    } else {
      toast.error("Add your username and token!", {
        position: "top-center",
      });
    }
  };
  const isFormValid =
    username.length >= 3 &&
    /^[a-zA-Z0-9]*$/.test(token) &&
    /\d/.test(token) &&
    /[a-zA-Z]/.test(token);

  return (
    <Form className="mt-3 w-75">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="formToken">
        <Form.Label>Token</Form.Label>
        <InputGroup>
          <FormControl
            type={showToken ? "text" : "password"}
            placeholder="Enter token"
            value={token}
            onChange={handleTokenChange}
          />

          <InputGroup.Text onClick={handleShowTokenChange}>
            {showToken ? "Hide" : "Show"}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Button
        className="w-100 mt-2 mb-2"
        variant="primary"
        type="button"
        onClick={handleLogin}
        disabled={!isFormValid}
      >
        Login
      </Button>
      <a href="https://gorest.co.in/consumer/login">Click here for the token</a>
    </Form>
  );
};

export default TokenInput;
