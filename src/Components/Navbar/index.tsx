import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
} from "react-bootstrap";
import { logoutSuccess } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../../app/store";
import { toast } from "react-toastify";

const pages = ["Home"];

const NavBar: React.FC = () => {
  const { currentUser, token } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    persistor.purge();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{ fontWeight: "bold" }}>Cloud4Feed</Navbar.Brand>
        <Nav>
          {currentUser ? (
            <NavDropdown
              className="d-flex justify-content-center align-items-center "
              title={currentUser}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavLink
              className="d-flex justify-content-center align-items-center "
              onClick={() => navigate("/")}
            >
              Login
            </NavLink>
          )}
          {pages.map((page) => (
            <Button
              key={page}
              style={{ color: "white" }}
              onClick={() =>
                !token ? toast.error("Enter the user!", { position: 'top-center' }) : navigate("/users")
              }
            >
              {page}
            </Button>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
