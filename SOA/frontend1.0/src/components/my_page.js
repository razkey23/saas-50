import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Login extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="collapse navbar-collapse justify-content-end" style={{marginRight: 40+"px"}}>
                    
                        { localStorage.getItem("token") === null ? (
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to={"/homepage"}>Home Page</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/sign-up"}>Sign Up</Link>
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
                </nav>
                <div class="ask-me"><h2>My.AskMeAnything</h2></div>
                <div className="home-pages">  
                    <Link to = "/userContrib" >
                        <div className='home-box' style={{backgroundColor: "cornsilk" }}>My questions<br/>My answers</div>
                    </Link>
                    <Link to = "/userDay" >
                        <div className='home-box' style={{backgroundColor: "lightcyan"}}>My contributions per day</div>
                    </Link>
                    <Link to = "/ask" >
                        <div className='home-box' style={{backgroundColor: "palegreen"}}>Ask new question</div>
                    </Link>
                    <Link to = "/answer" >
                        <div className='home-box' style={{backgroundColor: "lavender"}}>Answer a question</div>
                    </Link>
                </div>
                <div className="footer">
                    <a href="/">about</a>
                    <a href="/">contact us</a>
                    <a href="/">project documentation</a>
                    <a href="/">link on github</a>
                    <a href="/">cource materials</a>
                </div>
            </div>
        
        );
    }
}
