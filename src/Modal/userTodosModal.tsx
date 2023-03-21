import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addTodo, AddTodoPayload } from "../features/todosSlice";
import { AppDispatch } from "../app/store";
import { toast } from "react-toastify";

type todos = {
  id: string;
  user_id: any;
  title: string;
  due_on: string;
  status: string;
};

interface UserModalProps {
  id: string | undefined;
  show: boolean;
  onHide: () => void;
}
const TodosModal = ({ show, onHide, id }: UserModalProps) => {
  const [title, setTitle] = useState("");
  const [deadln, setDeadln] = useState("");
  const dispacth: AppDispatch = useDispatch();
  const { token } = useSelector((state: any) => state.auth);

  const handleAddUser = async () => {
    const newUser: AddTodoPayload = {
      user_id: id,
      title,
      due_on: deadln,
      status: "pending",
      token,
      id,
    };
    
    if (title === "" || deadln === "") {
      toast.error("Fill out the form!");
      
    }else{
     dispacth(addTodo(newUser));
    setTitle("");
    setDeadln("");
    onHide(); 
    }
    
    
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
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setDeadln(e.target.value)}
              placeholder="Todo"
              required
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
