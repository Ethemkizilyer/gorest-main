import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess } from "../../features/authSlice";

const TokenInput = () => {
  // const { setToken } = useContext(TokenContext);
  const [userInfo, setUserInfo] = useState({currentUser:"",token:""});
const dispatch=useDispatch()
const navigate=useNavigate()
  const handleAuth = async() => {
    console.log(userInfo)
    if (userInfo.currentUser && userInfo.token) {

 const response = await fetch("https://gorest.co.in/public/v2/users", {
   method: "POST",
   headers: {
     Accept: "application/json",
     "Content-Type": "application/json",
     Authorization:
       `Bearer ${userInfo.token}`,
   },
 });
console.log(response);
// yanıt kontrol edilir
if (response.status === 401) {
  toast.error("Geçersiz token. Lütfen tekrar deneyin.");
  return  setUserInfo({ currentUser: "", token: "" });
  
} else {
  dispatch(loginSuccess(userInfo));
  // setToken(tokenState);
  toast.success(`Hoşgeldin ${userInfo.currentUser}!`);
  // setTokenState("");
   setUserInfo({ currentUser: "", token: "" });
  return navigate("/users/*");
}

     
    } else {
      toast.error("Kullanıcı adınızı ve token ekleyin!");
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          width: "25ch",
          display: "flex",
          flexDirection: "column",
          margin: "1rem auto",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={userInfo.currentUser}
        onChange={(e) =>
          setUserInfo({ ...userInfo, currentUser: e.target.value })
        }
        id="user"
        label="Username"
        variant="standard"
      />
      <TextField
        value={userInfo.token}
        onChange={(e) =>
          setUserInfo({ ...userInfo, token: e.target.value })
        }
        id="token_input"
        label="Token"
        variant="standard"
      />
      <Button onClick={handleAuth} variant="contained">
        LOGIN
      </Button>
    </Box>
  );
};

export default TokenInput;
