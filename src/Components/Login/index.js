import React, { Component } from "react";
import { Link } from "react-router-dom";
import { users } from "../../db";
import history from "../../history";

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      invalidCredentials: false,
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
      this.setState({ invalidCredentials: true });
      setTimeout(() => this.setState({ invalidCredentials: false }), 5000);
    } else {
      LoginHandler();
    }
  };

  handleSignUp = (e) => {
    e.preventDefault();
    window.history.pushState({}, undefined, "/contact");
  };

  render() {
    const { userName, password, invalidCredentials } = this.state;
    return (
      <div className="container center">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
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
              </div>
              <br />
              {invalidCredentials && (
                <div class="alert alert-danger" role="alert">
                  <small>You have entered wrong credentials</small>
                </div>
              )}
            </form>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
