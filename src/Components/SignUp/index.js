import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addUser, users } from "../../db";

class SugnUpComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      userName: "",
      password: "",
    };
  }
  handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, userName, password } = this.state;
    addUser({ name, password, userName, email });
    console.log("akshay users", users);
  };

  handleStateValue = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { name, email, userName, password } = this.state;

    return (
      <div className="container center">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={name}
                  onChange={(e) =>
                    this.handleStateValue("name", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) =>
                    this.handleStateValue("email", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">UserName</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={userName}
                  onChange={(e) =>
                    this.handleStateValue("userName", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    this.handleStateValue("password", e.target.value)
                  }
                />
              </div>
              <div className="form-inline">
                <div className="">
                  <button
                    onClick={this.handleSignUp}
                    className="btn btn-primary"
                  >
                    SignUP
                  </button>
                </div>
                <div className="ml-2">
                  <Link to="/login">
                    <button type="button" className="btn btn-primary">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
              <br />
            </form>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    );
  }
}

export default SugnUpComponent;
