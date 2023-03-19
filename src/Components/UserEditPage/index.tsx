import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodos } from "../../api/users";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import TodosModal from "../../Modal/userTodosModal";
import { ArrowLeft } from "react-bootstrap-icons";
// Main todos data type
type todos = {
  id: string;
  user_id: string | undefined;
  title: string;
  due_on: string;
  status: string;
};

const UserEditPage: React.FC = () => {
  const [data, setData] = useState<todos[] | undefined>();
  const [isLoading, setLoading] = useState<boolean>();
  const navigate = useNavigate();
  const { token } = useSelector((state: any) => state.auth);
  let { id } = useParams<{ id?: string | undefined }>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      getTodos(id, token).then((asd) => {
        console.log(asd);
        setLoading(false);
        setData(asd);
      });
    }
  }, [showModal]);

  const handleAddUser = async (us: todos) => {
    await getTodos(id, token);
  };

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
        onAddUser={handleAddUser}
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
            {data?.length ? (
              data.map((item: todos) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td> {new Date(item.due_on).toLocaleString()}</td>
                  <td>
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
