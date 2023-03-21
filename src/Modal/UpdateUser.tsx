import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Gender, Status } from "../Components/UsersTable";
import { Person } from "../features/userSlice";

interface UserModalProps {
  onAddUser: (user: Person) => void;
  row: any;
  show: boolean;
  onHide: () => void;
}
const UpdateUserModal = ({ row, show, onHide, onAddUser }: UserModalProps) => {
  const [name, setName] = useState(row?.name);

  const [email, setEmail] = useState(row?.email);

  const [gender, setGender] = useState<Gender>(row?.gender);
  const [status, setStatus] = useState<Status>(row?.status);

  const handleAddUser = async () => {
    const newUser: Person = {
      id: row?.id,
      name,
      email,
      gender,
      status,
    };

     if (name === "" || email === "") {
       toast.error("Fill out the form!");
     } else {
      
    onAddUser(newUser);
    setGender(Gender.Male);
    setStatus(Status.Active);
    onHide();
     }

  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              required
            >
              <option value={Gender.Male}>Male</option>
              <option value={Gender.Female}>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              required
            >
              <option value={Status.Active}>Active</option>
              <option value={Status.Inactive}>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddUser}>
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUserModal;
