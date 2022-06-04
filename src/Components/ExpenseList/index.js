import React, { useEffect, useState } from "react";
import { deleteExpense, expense as mainDB, exportData } from "../../db";
import { Parser } from "json2csv";
import moment from "moment";
class ExpenseListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: mainDB,
      list: [],
      page: 1,
      limit: 10,
      maxPage: 1,
      sortObj: {
        order: "asc",
        field: "no",
      },
      searchText: "",
    };
  }
  componentDidMount() {
    exportData("from list mount");
    const { expense, limit } = this.state;
    this.setState({
      list: expense.slice(0, limit),
      maxPage: Math.ceil(expense.length / limit),
    });
    console.log("akshay mounting from expense List", mainDB);
  }
  componentWillUnmount() {
    exportData("from list unmount");
  }
  showPrev = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 }, () => {
      const { expense, limit, page } = this.state;
      this.setState({ list: expense.slice((page - 1) * limit, page * limit) });
    });
  };
  showNext = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 }, () => {
      const { expense, limit, page } = this.state;
      this.setState({ list: expense.slice((page - 1) * limit, page * limit) });
    });
  };

  sortData = (field, order) => {
    const { expense, limit } = this.state;
    let sortedExpense = [];
    if (field === "expense" || field === "desc") {
      sortedExpense = expense.sort((a, b) =>
        order === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field])
      );
    } else if (field === "price") {
      sortedExpense = expense.sort((a, b) =>
        order === "asc" ? a[field] - b[field] : b[field] - a[field]
      );
    } else if (field === "createdOn") {
      sortedExpense = expense.sort((a, b) =>
        order === "asc"
          ? new Date(a[field]) - new Date(b[field])
          : new Date(b[field]) - new Date(a[field])
      );
    }
    this.setState({
      sortObj: { field, order },
      expense: sortedExpense,
      list: sortedExpense.slice(0, limit),
      page: 1,
    });
  };

  searchData = (text) => {
    const { expense, limit } = this.state;

    if (text.length === 0) {
      const originalData = mainDB;
      this.setState({
        expense: [...originalData],
        list: originalData.slice(0, limit),
        page: 1,
        maxPage: Math.ceil(originalData.length / limit),
        searchText: text,
      });
      return;
    }
    this.setState({ searchText: text });
    let filteredData = expense.filter((e) => {
      const fields = Object.keys(e);
      let found = false;
      fields.forEach((val) => {
        if (e[val].toString().includes(text)) {
          found = true;
        }
      });
      return found;
    });
    this.setState({
      expense: filteredData,
      list: filteredData.slice(0, limit),
      page: 1,
      maxPage: Math.ceil(filteredData.length / limit),
    });
  };

  changeLimit = (limit) => {
    const { expense } = this.state;
    this.setState({
      list: expense.slice(0, limit),
      page: 1,
      maxPage: Math.ceil(expense.length / limit),
    });
  };

  exportAsCsv = (from) => {
    const { expense, list } = this.state;
    let downloadList = [];
    const fields = ["Expemse", "Price", "Description", "AddedOn"];
    if (from === "all") {
      downloadList = expense.map((e) => ({
        Expemse: e.expense,
        Price: e.price,
        Description: e.desc,
        AddedOn: e.createdOn,
      }));
    } else {
      downloadList = list.map((e) => ({
        Expemse: e.expense,
        Price: e.price,
        Description: e.desc,
        AddedOn: e.createdOn,
      }));
    }
    const json2csvParser = new Parser({ fields, unwind: "colors" });
    const csv = json2csvParser.parse(downloadList);
    const url = window.URL.createObjectURL(new Blob([csv]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `expense${moment().format("YYYY-MM-DD")}.csv`
    ); // or any other extension
    document.body.appendChild(link);
    link.click();
  };

  handleDelete = (val) => {
    const { expense, list } = this.state;
    deleteExpense(val);
    this.setState({
      expense: expense.filter((e) => e.id !== val.id),
      list: list.filter((e) => e.id !== val.id),
    });
  };

  render() {
    const { page, maxPage, limit, list, sortObj, searchText, limitError } =
      this.state;
    const { field, order } = sortObj;
    return (
      <>
        <div className="row">
          <div className="form-group">
            <label for="search-text">Enter Any Search Value</label>
            <input
              type="text"
              className="form-control"
              id="search-text"
              aria-describedby="emailHelp"
              placeholder="Enter expense"
              value={searchText}
              onChange={(e) => {
                e.preventDefault();
                this.searchData(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label for="limit-text">
              Enter Limit(Current Limit is {limit})
            </label>
            <input
              type="text"
              className="form-control"
              id="limit-text"
              aria-describedby="emailHelp"
              placeholder="Enter expense"
              value={limit}
              onChange={(e) => {
                e.preventDefault();
                if (+e.target.value < 1) {
                  this.setState({
                    limitError: "Limit should be greater then 1",
                  });
                  setTimeout(() => this.setState({ limitError: "" }), 5000);
                } else {
                  this.changeLimit(+e.target.value);
                  this.setState({ limit: +e.target.value });
                }
              }}
            />
            {!!limitError && limitError}
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={() => this.exportAsCsv("all")}
              className="btn btn-primary"
            >
              Export all data as CSV
            </button>
            <button
              type="button"
              onClick={() => this.exportAsCsv("")}
              className="btn btn-primary"
            >
              Export Current Data as CSV
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="row expense-header">
              <div className="col-lg-1">
                <button className="btn btn-link" disabled onClick={() => {}}>
                  <div className="form-inline">
                    <div>No.</div>
                  </div>
                </button>
              </div>
              <div className="col-lg-2">
                <button
                  className="btn btn-link"
                  onClick={() =>
                    this.sortData(
                      "expense",
                      field === "expense" && order === "asc" ? "desc" : "asc"
                    )
                  }
                >
                  <div className="form-inline">
                    <div>Expense</div>
                    {field === "expense" && order === "asc" && (
                      <i class="bi bi-arrow-up"></i>
                    )}
                    {field === "expense" && order === "desc" && (
                      <i class="bi bi-arrow-down"></i>
                    )}
                  </div>
                </button>
              </div>
              <div className="col-lg-2">
                <button
                  className="btn btn-link"
                  onClick={() =>
                    this.sortData(
                      "price",
                      field === "price" && order === "asc" ? "desc" : "asc"
                    )
                  }
                >
                  <div className="form-inline">
                    <div>Price</div>
                    {field === "price" && order === "asc" && (
                      <i class="bi bi-arrow-up"></i>
                    )}
                    {field === "price" && order === "desc" && (
                      <i class="bi bi-arrow-down"></i>
                    )}
                  </div>
                </button>
              </div>
              <div className="col-lg-4">
                <button
                  className="btn btn-link"
                  onClick={() =>
                    this.sortData(
                      "desc",
                      field === "desc" && order === "asc" ? "desc" : "asc"
                    )
                  }
                >
                  <div className="form-inline">
                    <div>Description</div>
                    {field === "desc" && order === "asc" && (
                      <i class="bi bi-arrow-up"></i>
                    )}
                    {field === "desc" && order === "desc" && (
                      <i class="bi bi-arrow-down"></i>
                    )}
                  </div>
                </button>
              </div>
              <div className="col-lg-3">
                <button
                  className="btn btn-link"
                  onClick={() =>
                    this.sortData(
                      "createdOn",
                      field === "createdOn" && order === "asc" ? "desc" : "asc"
                    )
                  }
                >
                  <div className="form-inline">
                    <div>Added On</div>
                    {field === "createdOn" && order === "asc" && (
                      <i class="bi bi-arrow-up"></i>
                    )}
                    {field === "createdOn" && order === "desc" && (
                      <i class="bi bi-arrow-down"></i>
                    )}
                  </div>
                </button>
              </div>
            </div>
            {list.map((e, i) => {
              return (
                <div className="row expense-column">
                  <div className="col-lg-1">{(page - 1) * limit + i + 1}</div>
                  <div className="col-lg-2 ellipsis-css">{e.expense}</div>
                  <div className="col-lg-2">{e.price}</div>
                  <div className="col-lg-4 ellipsis-css">{e.desc}</div>
                  <div className="col-lg-2">
                    {moment(e.createdOn).format("D MMM, YYYY HH:MM")}
                  </div>
                  <div className="col-lg-1">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(e)}
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-9">
                <div className="form-inline">
                  <div>
                    <button
                      type="button"
                      className="btn btn-link"
                      disabled={page <= 1}
                      onClick={this.showPrev}
                    >
                      Show Prev
                    </button>
                  </div>
                  <div>
                    Showing {page} of {maxPage}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-link"
                      disabled={page >= maxPage}
                      onClick={this.showNext}
                    >
                      Show Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ExpenseListComponent;
