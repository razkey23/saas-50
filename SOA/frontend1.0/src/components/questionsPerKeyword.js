import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class QuestionsPerKeyword extends Component {

    constructor(){
        super()
        this.state={
            keywords: ["Machine-Learning", "AI", "javascript", "java", "python", "Algorithms", "Graph Theory", "c++", "haskell"],
            keyword: '',
            questions: []
        }
    }

    loadQuestions(){
        axios({
            method: 'POST',
            url: `http://localhost:3001/proxy`,
            body: {
              "endpoint": "QuestionsPerKW",
              "keyword": this.state.keyword,
              "method": "GET"
            },
            Headers:{
              "Authorization": "Bearer Token"
            }
        }).then(function(response) {
            this.state.questions=response;
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
