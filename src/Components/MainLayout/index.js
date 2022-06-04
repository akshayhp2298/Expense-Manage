/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "./logo.png";
import { setDefaultData } from "../../db";

const MainLayout = ({ children, LogoutHandler, user }) => {
  return (
    <div className="container main-bg">
      <div className="row header">
        <div className="col-lg-2 header-logo">
          <img src={logo} height={80} width={80} alt={"altText"} />
        </div>
        <div className="col-lg-8 header-heading">Welcome To Expense Manage</div>
        <div className="col-lg-2 header-end">
          <button onClick={LogoutHandler} className="btn btn-info">
            LogOut
          </button>
          <div className="ellipsis-css">
            {user.name} ({user.email})
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <ul>
            <li className="nav-items">
              <Link to="/dashboard">
                <div>DashBoard</div>
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/expense/add">
                <div>Add Expense</div>
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/expense/list">
                <div>List Expense</div>
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/expense/all/list">
                <div>All Expense</div>
              </Link>
            </li>
            <li className="nav-items">
              <a
                href="#"
                onClick={() => {
                  if (window.confirm("Press a button!") === true) {
                    localStorage.removeItem("users");
                    localStorage.removeItem("expense");
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("authenticatedUser");
                    setDefaultData();
                    LogoutHandler();
                    toast.success("All Data has been cleared");
                  } else {
                    toast.error("Data is not cleared");
                  }
                }}
              >
                <div>Clear Storage</div>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-10">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
