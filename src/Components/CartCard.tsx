import { Button, Modal } from "react-bootstrap";
import {
  Grid,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import React from "react";
import IUserData from "../types";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
interface CartProps {
  row: IUserData;
  handleConfirm: (id: string | number) => void;
}

const CartCard: React.FC<CartProps> = ({
  row,
  handleConfirm,

}) => {
  const [showModals, setShowModals] = useState(false);
 const navTo = useNavigate();
 const handleDelete = () => {
   handleConfirm(row.id);
   setShowModals(false);
 };

 const rowClickHandler = (id: string) => {
   navTo(`/Users/${id}/edit`);
 };

  return (
    <TableRow
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { backgroundColor: "#1976d2" },
        cursor: "pointer",
      }}
    >
      <TableCell component="th" scope="row">
        {row.id.toString()}
      </TableCell>
      <TableCell
        onClick={() => rowClickHandler(row.id.toString())}
        align="center"
      >
        {row.name}
      </TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{row.gender}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center">
        <Button variant="danger" onClick={() => setShowModals(true)}>
          Delete
        </Button>
        <Modal show={showModals} onHide={() => setShowModals(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModals(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default CartCard;
