import React, { useState } from "react";
import { addExpense, expense } from "../../db";

const ExpenseAddComponent = () => {
  const [expense, setExpense] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ expense, price, desc, createdOn: new Date() });
    setShowConfirmationMessage(true);
    setTimeout(() => {
      setShowConfirmationMessage(false);
    }, 3000);
  };
  return (
    <form>
      <div className="form-group">
        <label for="expense-text">Enter Expense</label>
        <input
          type="text"
          className="form-control"
          id="expense-text"
          aria-describedby="emailHelp"
          placeholder="Enter expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="desc-text">Enter Description</label>
        <input
          type="text"
          className="form-control"
          id="desc-text"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label for="amount-text">Enter Amount</label>
        <input
          type="number"
          className="form-control"
          id="amount-text"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-inline">
        <div className="">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </div>
      <br />
      {showConfirmationMessage && (
        <div class="alert alert-danger" role="alert">
          <small>You have entered wrong credentials</small>
        </div>
      )}
    </form>
  );
};

export default ExpenseAddComponent;