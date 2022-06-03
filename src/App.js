import "./App.css";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import LoginComponent from "./Components/Login";
import SignUpComponent from "./Components/SignUp";
import NotFoundComponent from "./Components/NotFound";
import DashBoard from "./Components/DashBoard";
import ExpenseList from "./Components/ExpenseList";
import { useState } from "react";

const App = () => {
  const [auth, setAuth] = useState(null);
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
          <Route path="/" element={<div>this is a default page</div>} />
          <Route
            path="dashboard"
            element={<DashBoard LogoutHandler={() => removeAuthorization()} />}
          />
          <Route path="list" element={<ExpenseList />} />
        </>
      )}
      <Route component={<NotFoundComponent />} />
      <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;
