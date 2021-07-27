import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


const baseUrl = 'http://localhost:8000'
export default class Logout extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  
  logout(){
    alert(localStorage.getItem("token"));
    this.props.history.push('/mypage')
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
                </ul>
              ) : (
                  <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <Link className="nav-link" to={"/homepage"}>Home Page</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>Login</Link>
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
              <h2>Are you sure you want to logout?</h2>

            <button type="submit" onClick={() => this.logout()} className="btn btn-primary btn-block">Logout</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
