import React, { Component } from "react";
import axios from 'axios'
import Cookies from 'universal-cookie'

const baseUrl = 'http://localhost:8000'
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:'',
      password:'',
      password_again:''
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

  updatePasswordAgain(evt) {
    this.setState({
      password_again: evt.target.value
    });
    console.log(this.state)
  }

  register() {
    if(this.state.password === this.state.password_again){
      axios({
        method: 'POST',
        url: `http://localhost:3001/proxy`,
        body: {
          "endpoint": "register",
          "username": this.state.username,
          "password": this.state.password,
          "method": "POST"
        },
        Headers:{
          "Authorization": "Bearer Token"
        }
      }).then(function(response) {
        this.props.history.push('/login');
      }).catch(function(error) {
        alert(error)
      })
    }
    else {
      alert('No matching passwords')
    }
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h2>Sign Up</h2>

            <div className="form-group">
              <label>Email (user name):</label>
              <input type="text" className="form-control" placeholder="Enter e-mail or username" onChange={evt => this.updateUsername(evt)}></input>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={evt => this.updatePassword(evt)}></input>
            </div>

            <div className="form-group">
              <label>Re-enter password:</label>
              <input type="password" className="form-control" placeholder="Re-enter password" onChange={evt => this.updatePasswordAgain(evt)}></input>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={() => this.register}>Sign up</button>
            <button type="submit" className="btn btn-primary btn-block" onClick={() => this.props.history.push('/')}>Cancel</button>
          </form>
        </div>
      </div>
      
    );
  }
}