import "./App.css";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import LoginComponent from "./Components/Login";
import SignUpComponent from "./Components/SignUp";
import NotFoundComponent from "./Components/NotFound";
import MainLayout from "./Components/MainLayout";
import ExpenseList from "./Components/ExpenseList";
import { useState } from "react";
import DashBoardComponent from "./Components/DashBoard";
import ExpenseAddComponent from "./Components/ExpenseAdd";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("isAuthenticated"));
  const setAuthorization = () => {
    localStorage.setItem("isAuthenticated", true);
    setAuth(true);
  };
  const removeAuthorization = () => {
    localStorage.removeItem("isAuthenticated");
    setAuth(false);
  };
  return (
    <Routes>
      {!auth && (
        <>
          <Route
            path="login"
            element={<LoginComponent LoginHandler={() => setAuthorization()} />}
          />
          <Route path="signup" element={<SignUpComponent />} />
        </>
      )}
      {auth && (
        <>
          <Route
            path="/"
            // element={<DashBoard LogoutHandler={() => removeAuthorization()} />}
          >
            <Route
              path="dashboard"
              element={
                <MainLayout LogoutHandler={() => removeAuthorization()}>
                  <DashBoardComponent />
                </MainLayout>
              }
            />
          </Route>
          <Route
            path="/expense/list"
            element={
              <MainLayout LogoutHandler={() => removeAuthorization()}>
                <ExpenseList />
              </MainLayout>
            }
          />
          <Route
            path="/expense/add"
            element={
              <MainLayout LogoutHandler={() => removeAuthorization()}>
                <ExpenseAddComponent />
              </MainLayout>
            }
          />
        </>
      )}
      <Route component={<NotFoundComponent />} />
      <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;
