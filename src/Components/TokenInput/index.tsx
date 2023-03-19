import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess } from "../../features/authSlice";

const TokenInput = () => {
  // const { setToken } = useContext(TokenContext);
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


  const [userInfo, setUserInfo] = useState({currentUser:"",token:""});
const dispatch=useDispatch()
const navigate=useNavigate()
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
      console.log(response);
      // yanıt kontrol edilir
      if (response.status === 401) {
        toast.error("Geçersiz token. Lütfen tekrar deneyin.");
        return setUserInfo({ username: "", token: "" });
      } else {
        dispatch(loginSuccess({currentUser:username,token:token}));
        // setToken(tokenState);
        toast.success(`Hoşgeldin ${username}!`);
        // setTokenState("");
        setUserInfo({ username: "", token: "" });
        return navigate("/users/*");
      }
    } else {
      toast.error("Kullanıcı adınızı ve token ekleyin!");
    }
  };
const isFormValid =
  username.length >= 3 &&
  /^[a-zA-Z0-9]*$/.test(token) &&
  /\d/.test(token) &&
  /[a-zA-Z]/.test(token);

  return (
    <Form className="mt-3 container">
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
        className="w-100 mt-2"
        variant="primary"
        type="button"
        onClick={handleLogin}
        disabled={!isFormValid}
      >
        Login
      </Button>
    </Form>
  );
};

export default TokenInput;
