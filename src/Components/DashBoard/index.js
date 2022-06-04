import React from "react";
import { users, expense, currentExpense } from "../../db";

const DashBoardComponent = ({ user }) => {
  return (
    <div className="container">
      <div className="row">
        <h1>DashBoard</h1>
      </div>
      <div className="row">
        <div className="col-lg-4">Current User</div>
        <div className="col-lg-8">{users.length}</div>
      </div>
      <div className="row">
        <div className="col-lg-4">Current User's Expense</div>
        <div className="col-lg-8">
          {currentExpense(user.userId).reduce((sum, e) => sum + e.price, 0)}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">All User's Expense</div>
        <div className="col-lg-8">
          {expense.reduce((sum, e) => sum + e.price, 0)}
        </div>
      </div>
    </div>
  );
};

export default DashBoardComponent;
