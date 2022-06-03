import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

const MainLayout = ({ children, LogoutHandler }) => {
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
          </ul>
        </div>
        <div className="col-lg-10">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
