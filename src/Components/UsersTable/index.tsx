import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  deleteUser, getAllUsers } from "../../api/users";
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
import GenderSelect from "../GenderSelect";
import TableHeader from "../TableHeader";
import { useDispatch } from "react-redux/es/exports";
import IUserData from "../../types";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {  Container } from "react-bootstrap";
import UserModal from "../../Modal/AddUserModal";
import { pageMinus, pagePlus } from "../../features/authSlice";
import { toast } from "react-toastify";
import CartCard from "../CartCard";

export type User = {
  id: string;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Status {
  Active = "active",
  Inactive = "inactive",
}

const UsersTable: React.FC = () => {
  const DEFAULT_PAGE_INDEX = 0;
  const DEFAULT_ROWS_INDEX = 5;
  const DEFAULT_GENDER = "All";

  const [rows, setRows] = useState<Array<IUserData>>([]);
  const [pageQty, setPageQty] = useState<number>(DEFAULT_PAGE_INDEX);
  const [page, setPage] = useState<number>(DEFAULT_PAGE_INDEX);
  const [gender, setGender] = useState<string>(DEFAULT_GENDER);
  const [isLoading, setLoading] = useState<boolean>();

  const navTo = useNavigate();
const {token,eleman} = useSelector((state:any)=>state.auth)


  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
const  dispatch=useDispatch()
  const handleAddUser = (user: User) => {
    dispatch(pagePlus())
     getAllUsers(token, eleman).then((data: Array<IUserData>) => {
       console.log(data);
       setLoading(false);
       setRows(data);

       setPageQty(
        Math.ceil(data.length / DEFAULT_ROWS_INDEX)  || Math.ceil(selectedByGender().length / DEFAULT_ROWS_INDEX)
           
       );
     });
    setUsers([...users, user]);
  };


    const [showDeleteModal, setShowDeleteModal] = useState(false);

      const [showModals, setShowModals] = useState(false);

       const handleModalClose = () => {
         setShowModal(false);
       };

const handleDelete = () => {
  setShowModals(true);
};

const handleClose = () => {
  setShowModals(false);
};

const handleConfirm = async(id: string | number) => {
  // Burada silme işlemi yapılabilir
  console.log(typeof(id))
  // deleteUser(id, token);
  
  setShowModals(false);
  if (!token) {
    toast.error("Go home and add token!");
  }
  if (id && token) {
    console.log(id)

    
    await deleteUser(id, token,eleman);
    // await getAllUsers(token, eleman);
     dispatch(pageMinus()); 
    
  }
};
    // const changeUserHandler = (id:string) => {
    //   dispatch(pageMinus())
    //   console.log(token);
    //   if (!token) {
    //     toast.error("Go home and add token!");
    //   }
    //   if (id && token) {
    //     deleteUser(id, token)
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




  useEffect(() => {
    setLoading(true);

    getAllUsers(token, eleman).then((data: Array<IUserData>) => {
      console.log(data);
      setLoading(false);
      setRows(data);
      setPageQty(
      Math.ceil(data.length / DEFAULT_ROWS_INDEX) || Math.ceil(selectedByGender().length / DEFAULT_ROWS_INDEX)
          
      );
    });

    /* eslint-disable-next-line */
  }, [gender, eleman]);

  const selectedByGender = () => {
    console.log("rows",rows)
    return rows.filter((row: IUserData) => {
      if (gender.toLocaleLowerCase() === DEFAULT_GENDER.toLocaleLowerCase()) {
        return row.gender;
      }
      return row.gender === gender.toLocaleLowerCase();
    });
  };

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage - 1);
  };

  

  return (
    <Grid
      container
      spacing={5}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={8}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mt={7}
      >
        <GenderSelect setGender={setGender} gender={gender} />
        <Pagination
          count={pageQty}
          size="small"
          page={page + 1}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </Grid>
      <Grid item xs={8}>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Kullanıcı Ekle
        </Button>
        <UserModal
          onAddUser={handleAddUser}
          show={showModal}
          onHide={handleModalClose}
        />
      </Grid>

      <Grid item xs={8}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHeader />
              <TableBody>
                {selectedByGender()
                  .slice(
                    page * DEFAULT_ROWS_INDEX,
                    page * DEFAULT_ROWS_INDEX + DEFAULT_ROWS_INDEX
                  )
                  .map((row: IUserData) => (
                    <CartCard
                      row={row}
                      handleConfirm={handleConfirm}
                      key={row.id}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default UsersTable;
