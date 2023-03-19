import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../api/users";
import { Button, Pagination } from "react-bootstrap";
import { Grid, Box, CircularProgress } from "@mui/material";
import GenderSelect from "../GenderSelect";
import { useDispatch } from "react-redux/es/exports";
import { IUserData } from "../../types";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Container } from "react-bootstrap";
import UserModal from "../../Modal/AddUserModal";
import { pageMinus, pagePlus } from "../../features/authSlice";
import { toast } from "react-toastify";
import CartCard from "../CartCard";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

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
  const DEFAULT_ROWS_INDEX = 6;
  const DEFAULT_GENDER = "All";

  const [rows, setRows] = useState<Array<IUserData>>([]);
  const [pageQty, setPageQty] = useState<number>(DEFAULT_PAGE_INDEX);
  const [page, setPage] = useState<number>(DEFAULT_PAGE_INDEX);
  const [gender, setGender] = useState<string>(DEFAULT_GENDER);
  const [isLoading, setLoading] = useState<boolean>();

  const { token, eleman } = useSelector((state: any) => state.auth);

  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleAddUser = (user: User) => {
    dispatch(pagePlus());
    getAllUsers(token, eleman).then((data: Array<IUserData>) => {
      console.log(data);
      setLoading(false);
      setRows(data);

      setPageQty(
        Math.ceil(data.length / DEFAULT_ROWS_INDEX) ||
          Math.ceil(selectedByGender().length / DEFAULT_ROWS_INDEX)
      );
    });
    setUsers([...users, user]);
  };

  const [showModals, setShowModals] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleConfirm = async (id: string | number) => {
    setShowModals(false);
    if (!token) {
      toast.error("Go home and add token!");
    }
    if (id && token) {
      await deleteUser(id, token, eleman);

      dispatch(pageMinus());
    }
  };

  useEffect(() => {
    setLoading(true);

    getAllUsers(token, eleman).then((data: Array<IUserData>) => {
      console.log(data);
      setLoading(false);
      setRows(data);
      setPageQty(
        Math.ceil(data.length / DEFAULT_ROWS_INDEX) ||
          Math.ceil(selectedByGender().length / DEFAULT_ROWS_INDEX)
      );
    });
  }, [gender, eleman]);

  const selectedByGender = () => {
    console.log("rows", rows);
    return rows.filter((row: IUserData) => {
      if (gender.toLocaleLowerCase() === DEFAULT_GENDER.toLocaleLowerCase()) {
        return row.gender;
      }
      return row.gender === gender.toLocaleLowerCase();
    });
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage - 1);
  };

  const [activePage, setActivePage] = useState(1);
  const cardsPerPage = 6;

  const handlePaginationClick = (event: any) => {
    setActivePage(event);
    handleChangePage(event);
  };

  const renderCards = () => {
    const startIndex = (activePage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return selectedByGender()
      .slice(startIndex, endIndex)
      .map((card) => (
        <CartCard
          setRows={setRows}
          rows={rows}
          row={card}
          handleConfirm={handleConfirm}
          key={card.id}
        />
      ));
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    paginationItems.push(
      <Pagination.Prev
        key="prev"
        disabled={activePage === 1}
        onClick={() => handlePaginationClick(activePage - 1)}
      >
        <ArrowLeft />
      </Pagination.Prev>
    );

    // Render the first page
    if (pageQty > 0) {
      paginationItems.push(
        <Pagination.Item
          key={1}
          active={activePage === 1}
          onClick={() => handlePaginationClick(1)}
        >
          1
        </Pagination.Item>
      );
    }

    // Render the middle pages (up to 3)
    let startPage = Math.max(2, activePage - 1);
    let endPage = Math.min(pageQty - 1, activePage + 1);

    if (startPage > 2) {
      // Render an ellipsis before the start page
      paginationItems.push(
        <Pagination.Ellipsis key="ellipsis-start" disabled={true} />
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={activePage === i}
          onClick={() => handlePaginationClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < pageQty - 1) {
      // Render an ellipsis after the end page
      paginationItems.push(
        <Pagination.Ellipsis key="ellipsis-end" disabled={true} />
      );
    }

    // Render the last page
    if (pageQty > 1) {
      paginationItems.push(
        <Pagination.Item
          key={pageQty}
          active={activePage === pageQty}
          onClick={() => handlePaginationClick(pageQty)}
        >
          {pageQty}
        </Pagination.Item>
      );
    }

    paginationItems.push(
      <Pagination.Next
        key="next"
        disabled={activePage === pageQty}
        onClick={() => handlePaginationClick(activePage + 1)}
      >
        <ArrowRight />
      </Pagination.Next>
    );
    return paginationItems;
  };

  return (
    <Container>
      <div className="d-flex justify-content-between vertical-align-middle align-items-center mt-3">
        <GenderSelect setGender={setGender} gender={gender} />
        <Pagination>{renderPaginationItems()}</Pagination>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Kullanıcı Ekle
        </Button>
        <UserModal
          onAddUser={handleAddUser}
          show={showModal}
          onHide={handleModalClose}
        />
      </div>

      <Grid item xs={8}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <div className="container mb-3">
            <div className="row d-flex align-items-center justify-content-center gap-2">
              {renderCards()}
            </div>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default UsersTable;
