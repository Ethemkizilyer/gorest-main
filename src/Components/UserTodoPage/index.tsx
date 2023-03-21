import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import TodosModal from "../../Modal/userTodosModal";
import { ArrowLeft } from "react-bootstrap-icons";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { getTodosAsync } from "../../features/todosSlice";
// Main todos data type
type todos = {
  id: string;
  user_id: string | undefined;
  title: string;
  due_on: string;
  status: string;
};

const UserEditPage: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>();
  const navigate = useNavigate();
  const { token } = useSelector((state: any) => state.auth);
  const { todos } = useSelector((state: any) => state.todos);
  let { id } = useParams<{ id?: string | undefined }>();
  const [showModal, setShowModal] = useState(false);
const dispacth: AppDispatch = useDispatch();
  useEffect(() => {
    setLoading(true);

    if (id) {
      dispacth(getTodosAsync({id,token}))
      setLoading(false);

    }
  }, [showModal]);


  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-2">
      <Button
        className="d-block mb-2"
        variant="dark"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
      </Button>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Yorum Ekle
      </Button>
      <TodosModal
        show={showModal}
        onHide={handleModalClose}
        id={id}
      />
      {isLoading ? (
        <Spinner
          className="text-center mx-auto "
          animation="border"
          variant="primary"
        />
      ) : (
        <Table className="mt-2" striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos?.length ? (
              todos.map((item: todos) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td> {new Date(item.due_on).toLocaleString()}</td>
                  <td
                    style={{
                      color: "white",
                      background:
                        new Date().toJSON() > item.due_on ? "green" : "red",
                    }}
                  >
                    {new Date().toJSON() > item.due_on
                      ? "Completed"
                      : "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  Görüntülenecek Veri Yok.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserEditPage;
