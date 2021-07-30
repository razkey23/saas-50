import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Login extends Component {

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
                            <li className="nav-item">
                            <Link className="nav-link" to={"/sign-up"}>SignUp</Link>
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
                <div class="ask-me"><h2>My.AskMeAnything</h2></div>
                <div className="home-pages">  
                    <Link to = "/userContrib" >
                    <div className='home-box'>My questions<br/><br/>My answers</div>
                    </Link>
                    <Link to = "/userDay" >
                        <div className='home-box'>My contributions per day</div>
                    </Link>
                    <Link to = "/ask" >
                        <div className='home-box'> ask new question</div>
                    </Link>
                    <Link to = "/answer" >
                        <div className='home-box'>answer a question</div>
                    </Link>
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
