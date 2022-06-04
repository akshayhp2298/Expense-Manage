import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { users } from "../../db";

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
    };
  }
  handleStateValue = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;
    const { LoginHandler } = this.props;
    const user = users.find(
      (e) => e.userName === userName && e.password === password
    );
    if (!user) {
      toast.error("Invalid Credentials");
    } else {
      LoginHandler(user);
      toast.success("Login Success");
    }
  };

  handleSignUp = (e) => {
    e.preventDefault();
    window.history.pushState({}, undefined, "/contact");
  };

  render() {
    const { userName, password } = this.state;
    return (
      <div className="container center">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <form>
              <div className="form-group">
                <label for="email-text">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email-text"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={userName}
                  onChange={(e) =>
                    this.handleStateValue("userName", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label for="passoword-text">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="passoword-text"
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
                    type="button"
                    onClick={this.handleSubmit}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
                <div className="ml-2">
                  <Link to="/SignUP">
                    <button type="button" className="btn btn-primary">
                      SignUP
                    </button>
                  </Link>
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => {
                      toast.info(
                        'Use "admin" as username & password\n Or SignUp'
                      );
                    }}
                    className="btn btn-primary"
                  >
                    Hint
                  </button>
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

export default LoginComponent;
