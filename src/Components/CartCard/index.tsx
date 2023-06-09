import { Button, Col, Modal } from "react-bootstrap";
import React from "react";
import { IUserData } from "../../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import UpdateUserModal from "../../Modal/UpdateUser";
import { useDispatch, useSelector } from "react-redux";
import { Gender, Status } from "../UsersTable";
import { toast } from "react-toastify";
import { AppDispatch } from "../../app/store";
import { Person, putUser } from "../../features/userSlice";
interface CartProps {
  row: IUserData;
  handleConfirm: (id: string | number) => void;
  setRows: React.FC<React.SetStateAction<IUserData[]>> | any;
}
export type User = {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
};
const CartCard: React.FC<CartProps> = ({ setRows, row, handleConfirm }) => {
  const { token, eleman } = useSelector((state: any) => state.auth);
  const [showModals, setShowModals] = useState(false);
  const [showModa, setShowModa] = useState(false);
  const { users, person } = useSelector((state: any) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const navTo = useNavigate();
  const handleDelete = () => {
    handleConfirm(row.id);
    setShowModa(false);
  };

  const rowClickHandler = (id: string) => {
    navTo(`/users/${id}/todos`);
  };
  const rowClickHand = (id: string) => {
    setShowModals(true);
  };

  const handleModalClose = () => {
    setShowModals(false);
  };

  const changeUserHandler = (user: Person) => {
    console.log(token);
    if (!token) {
      toast.error("Go home and add token!");
    }
    if (user && token) {
      dispatch(putUser({ eleman, token, user }));
    }
  };

  return (
    <Card
      className="my-card"
      key={row.id}
      style={{ width: "18rem", height: "15rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{row.name}</Card.Title>

        <Card.Text>
          <strong>Email:</strong>
          {row.email}
          <br />
          <strong>Gender:</strong> {row.gender} <br />
          <strong>Status:</strong>{" "}
          <span style={{ color: row.status === "active" ? "green" : "red" }}>
            {row.status}
          </span>
        </Card.Text>
        <Col
          style={{ width: "80%" }}
          className="position-absolute bottom-0 mb-3 d-flex align-items-center justify-content-between"
        >
          <Button
            variant="warning"
            onClick={() => rowClickHand(row.id.toString())}
          >
            Update
          </Button>
          <UpdateUserModal
            onAddUser={changeUserHandler}
            show={showModals}
            onHide={handleModalClose}
            row={row}
          />
          <Button
            variant="info"
            onClick={() => rowClickHandler(row.id.toString())}
          >
            Detail
          </Button>
          <Button variant="danger" onClick={() => setShowModa(true)}>
            Delete
          </Button>
          <Modal show={showModa} onHide={() => setShowModa(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete this card?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModa(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default CartCard;
