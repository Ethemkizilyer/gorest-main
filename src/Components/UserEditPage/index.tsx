import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getOneUser, putUser } from "../../api/users";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import TableHeader from "../TableHeader";
import IUserData from "../../types";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

const UserEditPage: React.FC = () => {
  const [user, setUser] = useState<IUserData | undefined>();
  const [isLoading, setLoading] = useState<boolean>();
  // const { token } = useContext(TokenContext);
const token = useSelector((state:any) => state.auth.token);
  let { id } = useParams<{ id?: string | undefined }>();
  const navTo = useNavigate();



  useEffect(() => {
    setLoading(true);
    if (id) {
      getOneUser(id,token).then((data) => {
        setLoading(false);
        setUser(data);
      });
    }
    /* eslint-disable-next-line */
  }, []);

  const handleChangeInput =
    (prop: keyof IUserData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser((previousValue: IUserData | undefined) => {
        if (previousValue) {
          previousValue[prop] = event.target.value;
          return { ...previousValue };
        }
        return;
      });
    };

  const handleChangeSelect =
    (prop: keyof IUserData) => (event: SelectChangeEvent) => {
      setUser((previousValue: IUserData | undefined) => {
        if (previousValue) {
          previousValue[prop] = event.target.value;
          return { ...previousValue };
        }
        return;
      });
    };

  const changeUserHandler = () => {
    console.log(token);
    if (!token) {
      toast.error("Go home and add token!");
    }
    if (user && token) {
      putUser(user, token)
        .then((data) => {
          if (!data.ok) {
            toast.error(`${data.message}`);
          }
          if (data.ok) {
            toast.success("Success!");
            navTo("/users");
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    }
    return;
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ mt: 5 }}
      spacing={3}
    >
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid item xs={10}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHeader />
                <TableBody>
                  {user && (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {user.id}
                      </TableCell>
                      <TableCell align='right'>
                        <TextField
                          variant='outlined'
                          value={user.name}
                          onChange={handleChangeInput("name")}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <TextField
                          variant='outlined'
                          value={user.email}
                          onChange={handleChangeInput("email")}
                          sx={{
                            input: { textAlign: "center" },
                            margin: "15px",
                          }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Select
                          sx={{ width: "110px" }}
                          value={user.gender}
                          onChange={handleChangeSelect("gender")}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align='right'>
                        <Select
                          sx={{ width: "110px" }}
                          value={user.status}
                          onChange={handleChangeSelect("status")}
                        >
                          <MenuItem value={"active"}>Active</MenuItem>
                          <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            <Button variant='contained' onClick={changeUserHandler}>
              Save
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default UserEditPage;
