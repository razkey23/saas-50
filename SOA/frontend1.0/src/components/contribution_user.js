import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import jwt from 'jwt-decode'


export default class ContribUser extends Component {

    constructor(){
        super()
        this.state={
            questions: [],
            answers: []
        }
    }

    componentDidMount(){
        const userId = jwt(localStorage.getItem("token")).id;
        axios({
          method: 'POST',
          url: `http://localhost:3001/proxy`,
          body: {
            "endpoint": "AnswersOfUser",
            "user": userId,
            "method": "GET"
          },
          Headers:{
            "Authorization": "Bearer "+localStorage.getItem("token")
          }
        }).then(function(response) {
            this.setState({
                answers: response
            })
        }).catch(function(error) {
          alert(error)
        })
        // TODO: this need to be created
        axios({
            method: 'POST',
            url: `http://localhost:3001/proxy`,
            body: {
              "endpoint": "QuestionsOfUser",
              "user": userId,
              "method": "GET"
            },
            Headers:{
              "Authorization": "Bearer "+localStorage.getItem("token")
            }
          }).then(function(response) {
              this.setState({
                  answers: response
              })
          }).catch(function(error) {
            alert(error)
          })  
    }
    render() {
        //these to be changed to the fields we want to show
        var columnsQ = [
            { dataField: 'id', text: 'Id' },
            { dataField: 'title', text: 'Title' },
            { dataField: 'text', text: 'Text' },
          ]
        var columnsA = [
            { dataField: 'id', text: 'Id' },
            { dataField: 'text', text: 'text' },
        ]
        
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        { localStorage.getItem("token") === null ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to={"/homepage"}>Home Page</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/signup"}>SignUp</Link>
                            </li>
                        </ul>
                        ) : (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to={"/homepage"}>Home Page</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/mypage"}>My Page</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/logout"}>Logout</Link>
                            </li>
                        </ul>
                        )
                        }
                        
                    </div>
                    </div>
                </nav>
                <h2 style={{marginTop:50+"px", marginLeft:50+"px"}}>Your questions:</h2>
                <div style={{marginTop:50+"px", marginLeft:50+"px", marginRight:50+"px"}}>
                    <BootstrapTable
                        data={ this.state.questions }
                        columns={ columnsQ }
                        keyField='id'>
                    </BootstrapTable>
                </div>
                <h2 style={{marginTop:50+"px", marginLeft:50+"px"}}>Your answers:</h2>
                <div style={{marginTop:50+"px", marginLeft:50+"px", marginRight:50+"px"}}>
                    <BootstrapTable
                        data={ this.state.answers }
                        columns={ columnsA }
                        keyField='id'>
                    </BootstrapTable>
                </div>
                <div className="footer">
                    <p>about</p>
                    <p>contact us</p>
                    <p>project documentation</p>
                    <p>link on github</p>
                    <p>cource materials</p>
                </div>
            </div>
        );
    }
}
