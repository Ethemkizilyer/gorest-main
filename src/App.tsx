import React from "react";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css"
import Home from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import UserEditPage from "./Components/UserEditPage";
import UsersTable from "./Components/UsersTable";
import PrivateRouter from "./router/PrivateRouter";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="" element={<PrivateRouter />}>
            <Route path="/users/*" element={<UsersTable />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
          <Route path="/users/:id/edit" element={<UserEditPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
