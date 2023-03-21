import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { User, Gender, Status } from "../Components/UsersTable";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { toast } from "react-toastify";

interface UserModalProps {
  onAddUser: (user: User) => void;

  show: boolean;
  onHide: () => void;
}
const UserModal = ({ show, onHide, onAddUser }: UserModalProps) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [status, setStatus] = useState<Status>(Status.Active);
  const dispatch: AppDispatch = useDispatch();
  const { token, eleman } = useSelector((state: any) => state.auth);

  const handleAddUser = async () => {
    const newUser: User = {
      id: Math.ceil(Math.random() * 100000).toString(),
      name,
      email,
      gender,
      status,
    };

 if (name === "" || email === "" ) {
   toast.error("Fill out the form!");
 } else {
 dispatch(addUser({ eleman, token, newUser }));
 onAddUser(newUser);
 setName("");
 setEmail("");
 setGender(Gender.Male);
 setStatus(Status.Active);
 onHide();
 }
    

 
    
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
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
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
