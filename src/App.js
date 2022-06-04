import "./App.css";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import LoginComponent from "./Components/Login";
import SignUpComponent from "./Components/SignUp";
import NotFoundComponent from "./Components/NotFound";
import MainLayout from "./Components/MainLayout";
import ExpenseList from "./Components/ExpenseList";
import React, { useEffect, useState } from "react";
import DashBoardComponent from "./Components/DashBoard";
import ExpenseAddComponent from "./Components/ExpenseAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importData, exportData } from "./db";
import { render } from "@testing-library/react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false,
    };
  }
  componentDidMount() {
    this.setState({ auth: localStorage.getItem("isAuthenticated") });
    let data = { users: [], expense: [] };
    try {
      data = JSON.parse(localStorage.getItem("myLocalDB") || "");
    } catch (e) {
      // ignore
    }
    alert("app mounted");
    exportData("from app mount");
    importData(data);
  }
  componentWillUnmount() {
    const data = exportData("from app unmount");
    alert(`unmounting ${data.expense.length}`);
    localStorage.setItem("myLocalDB", JSON.stringify(data));
  }
  setAuth = (val) => {
    this.setState({ auth: val });
  };
  setAuthorization = () => {
    localStorage.setItem("isAuthenticated", true);
    this.setAuth(true);
  };
  removeAuthorization = () => {
    localStorage.removeItem("isAuthenticated");
    this.setAuth(false);
    toast("You Have Logged out!!!");
  };

  render() {
    const { auth } = this.state;
    return (
      <>
        <Routes>
          {!auth && (
            <>
              <Route
                path="login"
                element={
                  <LoginComponent
                    LoginHandler={() => this.setAuthorization()}
                  />
                }
              />
              <Route
                path="signup"
                element={
                  <SignUpComponent
                    LoginHandler={() => this.setAuthorization()}
                  />
                }
              />
            </>
          )}
          {auth && (
            <>
              <Route
                path="/"
                element={
                  <MainLayout LogoutHandler={() => this.removeAuthorization()}>
                    <DashBoardComponent />
                  </MainLayout>
                }
              >
                <Route
                  path="dashboard"
                  element={
                    <MainLayout
                      LogoutHandler={() => this.removeAuthorization()}
                    >
                      <DashBoardComponent />
                    </MainLayout>
                  }
                />
              </Route>
              <Route
                path="/expense/list"
                element={
                  <MainLayout LogoutHandler={() => this.removeAuthorization()}>
                    <ExpenseList />
                  </MainLayout>
                }
              />
              <Route
                path="/expense/add"
                element={
                  <MainLayout LogoutHandler={() => this.removeAuthorization()}>
                    <ExpenseAddComponent />
                  </MainLayout>
                }
              />
            </>
          )}
          <Route component={<NotFoundComponent />} />
          <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </>
    );
  }
}

export default App;
