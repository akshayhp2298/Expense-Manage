import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./Components/Login";
import SignUpComponent from "./Components/SignUp";
import NotFoundComponent from "./Components/NotFound";
import MainLayout from "./Components/MainLayout";
import ExpenseList from "./Components/ExpenseList";
import React from "react";
import DashBoardComponent from "./Components/DashBoard";
import ExpenseAddComponent from "./Components/ExpenseAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      user: {},
    };
  }
  componentDidMount() {
    this.setState({
      auth: localStorage.getItem("isAuthenticated"),
      user: JSON.parse(localStorage.getItem("authenticatedUser")),
    });
  }
  componentWillUnmount() {}
  setAuth = (val) => {
    this.setState({ auth: val });
  };
  setAuthorization = (user) => {
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("authenticatedUser", JSON.stringify(user));
    this.setState({ user });
    this.setAuth(true);
  };
  removeAuthorization = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authenticatedUser");
    this.setAuth(false);
    toast.info("You Have Logged out!!!");
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
                    LoginHandler={(user) => this.setAuthorization(user)}
                  />
                }
              />
              <Route
                path="signup"
                element={
                  <SignUpComponent
                    LoginHandler={(user) => this.setAuthorization(user)}
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
                  <MainLayout
                    LogoutHandler={() => this.removeAuthorization()}
                    user={this.state.user}
                  >
                    <DashBoardComponent user={this.state.user} />
                  </MainLayout>
                }
              >
                <Route
                  path="dashboard"
                  element={
                    <MainLayout
                      LogoutHandler={() => this.removeAuthorization()}
                      user={this.state.user}
                    >
                      <DashBoardComponent />
                    </MainLayout>
                  }
                />
              </Route>
              <Route
                path="/expense/all/list"
                element={
                  <MainLayout
                    LogoutHandler={() => this.removeAuthorization()}
                    user={this.state.user}
                  >
                    <ExpenseList allExpense />
                  </MainLayout>
                }
              />
              <Route
                path="/expense/list"
                element={
                  <MainLayout
                    LogoutHandler={() => this.removeAuthorization()}
                    user={this.state.user}
                  >
                    <ExpenseList />
                  </MainLayout>
                }
              />
              <Route
                path="/expense/add"
                element={
                  <MainLayout
                    LogoutHandler={() => this.removeAuthorization()}
                    user={this.state.user}
                  >
                    <ExpenseAddComponent user={this.state.user} />
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
