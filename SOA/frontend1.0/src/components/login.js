import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  updateUsername(evt){
    this.setState({
      username: evt.target.value
    });
    console.log(this.state)
  }

  updatePassword(evt){
    this.setState({
      password: evt.target.value
    });
    console.log(this.state)
  }
  
  login(){
    axios({
      method: 'POST',
      url: `http://localhost:3001/proxy`,
      body: {
        "endpoint": "signin",
        "username": this.state.username,
        "password": this.state.password,
        "method": "POST"
      },
      Headers:{
        "Authorization": "Bearer Token"
      }
    }).then(function(response) {
      localStorage.setItem('token', response);
      this.props.history.push('/mypage');
    }).catch(function(error) {
      alert(error)
    })
  }

  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            
              { localStorage["token"] ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/mypage"}>Home Page</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/logout"}>Logout</Link>
                  </li>
                </ul>
              ) : (
                  <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <Link className="nav-link" to={"/homepage"}>Home Page</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>SignUp</Link>
                  </li>
                </ul>
                )
              }
              
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
              <form>
              <h2>Login</h2>

              <div className="form-group">
                <label>User:</label>
                <input type="text" className="form-control" placeholder="Enter username" onChange={evt => this.updateUsername(evt)}></input>
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={evt => this.updatePassword(evt)}></input>
              </div>

            <button type="submit" onClick={() => this.login()} className="btn btn-primary btn-block" style={{marginTop:1+'em'}}>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
