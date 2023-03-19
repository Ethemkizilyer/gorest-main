import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getOneUser, getTodos, putUser } from "../../api/users";

import TableHeader from "../TableHeader";


import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button, Card, Container, Row, Spinner,Table } from "react-bootstrap";
import TodosModal from "../../Modal/userTodosModal";

// Main todos data type
type todos= {
  id: string ;
  user_id: string | undefined ;
  title : string;
  due_on: string;
  status: string;
}

const UserEditPage: React.FC = () => {
  // const [user, setUser] = useState<IUserTodos | undefined>();
  const [data, setData] = useState<todos[] | undefined>();
  const [isLoading, setLoading] = useState<boolean>();
  // const { token } = useContext(TokenContext);
const {token,eleman} = useSelector((state:any) => state.auth);
  let { id } = useParams<{ id?: string | undefined }>();
  const navTo = useNavigate();
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
    /* eslint-disable-next-line */
    // console.log(getTodos(id,token))
  }, [showModal]);

  // console.log(data)

  // const handleChangeInput =
  //   (prop: keyof IUserData) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setUser((previousValue: IUserData | undefined) => {
  //       if (previousValue) {
  //         previousValue[prop] = event.target.value;
  //         return { ...previousValue };
  //       }
  //       return;
  //     });
  //   };

  // const handleChangeSelect =
  //   (prop: keyof IUserData) => (event: SelectChangeEvent) => {
  //     setUser((previousValue: IUserData | undefined) => {
  //       if (previousValue) {
  //         previousValue[prop] = event.target.value;
  //         return { ...previousValue };
  //       }
  //       return;
  //     });
  //   };

  // const changeUserHandler = () => {
  //   console.log(token);
  //   if (!token) {
  //     toast.error("Go home and add token!");
  //   }
  //   if (user && token) {
  //     putUser(user, token,eleman)
  //       .then((data) => {
  //         if (!data.ok) {
  //           toast.error(`${data.message}`);
  //         }
  //         if (data.ok) {
  //           toast.success("Success!");
  //           navTo("/users");
  //         }
  //       })
  //       .catch((e) => {
  //         throw new Error(e);
  //       });
  //   }
  //   return;
  // };

   const handleAddUser = async(us:todos) => {
    await getTodos(id, token);
    console.log("user")
   };

     const handleModalClose = () => {
       setShowModal(false);
     };

  return (
    <Container className="mt-2">
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
                  {/* <td> {new Date(item.due_on).toLocaleString()}</td> */}
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
                <td colSpan={4} className="text-center" >Görüntülenecek Veri Yok.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserEditPage;
