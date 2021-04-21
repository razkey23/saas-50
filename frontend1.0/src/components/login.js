import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
            <form>
            <h2>Login</h2>

            <div className="form-group">
              <label>User:</label>
              <input type="text" className="form-control" placeholder="Enter username"></input>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" placeholder="Enter password"></input>
            </div>

          <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
      </div>

    );
  }
}
