import React, { Component } from "react";

export default class SignUp extends Component {
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h2>Sign Up</h2>

            <div className="form-group">
              <label>Email (user name):</label>
              <input type="text" className="form-control" placeholder="Enter e-mail or username"></input>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" placeholder="Enter password"></input>
            </div>

            <div className="form-group">
              <label>Re-enter password:</label>
              <input type="password" className="form-control" placeholder="Re-enter password"></input>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
            <button type="submit" className="btn btn-primary btn-block">Cancel</button>
          </form>
        </div>
      </div>
      
    );
  }
}