import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {  getAddTodo, getAllUsers, getTodos} from "../api/users";
import { useSelector } from "react-redux/es/hooks/useSelector";

type todos = {
  id: string  ;
  user_id: any;
  title: string;
  due_on: string;
  status: string;
};

interface UserModalProps {
  onAddUser: (user:todos) => void;
  id: string | undefined;
  show: boolean;
  onHide: () => void;
}
const TodosModal = ({ show, onHide, onAddUser,id}: UserModalProps) => {
  const [title, setTitle] = useState("");
  const [deadln, setDeadln] = useState("");
  const [statu, setStatu] = useState("");

  const {token,eleman} = useSelector((state: any) => state.auth);

  const handleAddUser = async() => {
    const newUser: todos = {
      id: "1",
      user_id: id,
      title,
      due_on: deadln,
      status: "pending",
    };
    console.log(deadln)
    console.log(newUser);
    await getAddTodo(newUser, token,id);
    await getTodos(id, token);
    onAddUser(newUser);

    // await getAllUsers(token, eleman);
    setTitle("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setDeadln(e.target.value)}
              placeholder="Todo"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddUser}>
          Add Todo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TodosModal;
