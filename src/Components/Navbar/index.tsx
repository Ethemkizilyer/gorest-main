import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Nav,Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { logoutSuccess } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../../app/store";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const pages = ["Home"];

const NavBar: React.FC = () => {
const user =useSelector((state:any)=>state.auth.currentUser)
const navigate=useNavigate()
const dispatch=useDispatch()

  const handleLogout = () => {
    dispatch(logoutSuccess()); // Kullanıcıyı logout işlemi için user.actions içinde bir logout fonksiyonu kullanıyoruz
    persistor.purge(); // Redux Persist'teki tüm saklanan verileri temizlemek için persistor.purge() kullanıyoruz
    navigate("/")
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cloud4Feed
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            {user ? (
              <NavDropdown
                className="d-flex justify-content-center align-items-center "
                title={user}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink
                className="d-flex justify-content-center align-items-center "
                onClick={() => navigate("/")}
              >
                Login
              </NavLink>
            )}

            <NavbarCollapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink href="#">Home</NavLink>
                {user ? (
                  <NavLink onClick={handleLogout}>Logout</NavLink>
                ) : (
                  <NavLink onClick={() => navigate("/")}>Login</NavLink>
                )}
              </Nav>
            </NavbarCollapse>
            {/* {user && (
              <div className="ml-auto">
                <span>{user}</span>
              </div>
            )} */}
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/users`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
