import React, { Component } from "react";
import Cookies from "universal-cookie";
import jwt from 'jwt-decode'
import axios from 'axios'
import { Link } from "react-router-dom";


const cookies = new Cookies();
const baseUrl = 'http://localhost:8000'

export default class Ask extends Component {

    constructor() {
        super();
        this.state = {
            question_name: '',
            question_text: '',
            keywords: [],
            token: cookies.get('token')
        }
    }

    sumbitQuestion(){
        // pass the token in the headers
        const userId = jwt(this.state.token).id;
        axios({
            method: 'POST',
            url: `${baseUrl}/AddQuestion`,
            data: {
                userId: userId,
                title: this.state.question_name,
                text: this.state.question_text,
                keywords: this.state.keywords,
                date_asked: (new Date()).toString()
            }
          }).then(function(response) {
            this.history.push('/myhomepage')
          }).catch(function(error) {
            alert(error)
          })
    }

    updateTitle(evt){
        this.setState({
            question_name: evt.target.value
          });
    }

    updateText(evt){
        this.setState({
            question_text: evt.target.value
          });
    }

    updateKeywords(evt){
        this.setState({
            keywords: evt.target.value.split(",").join(" ").split(" ").filter(function (i) { return i })
        });
    }

    routeChange() {
        let path = `/mypage`;
        this.props.history.push(path);
    }
    
    render() {
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
                        </ul>
                        ) : (
                            <ul className="navbar-nav ml-auto">
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
                <div className="verical-orientation">
                    <div class="ask-me" style={{paddingLeft:5+"%", paddingBottom:2+"em"}}>Ask a question</div>
                    <div className="horizontal-orientation">
                        <label style={{width:20+'%'}}>Question title:</label>
                        <input type="text" className="form-control" onChange={evt => this.updateTitle(evt)}></input>
                    </div>

                    <div className="horizontal-orientation">
                        <label style={{width:20+'%'}}>Question text:</label>
                        <textarea className="form-control" rows="5" style={{resize:"none"}} onChange={evt => this.updateText(evt)}></textarea>
                    </div>

                    <div className="horizontal-orientation">
                        <label style={{width:20+'%'}}>Keywords:</label>
                        <input type="text" className="form-control" onChange={evt => this.updateKeywords(evt)}></input>
                    </div>
                    
                    <div className="buttons" style={{marginLeft:"20%"}}>
                        <button style={{width:40+"%"}} onClick={() => this.sumbitQuestion()}>Submit</button>
                        <button style={{width:40+"%"}} onClick={() => this.routeChange()}>Cancel</button>
                    </div>
                </div>
            </div>
        
        );
    }
}
