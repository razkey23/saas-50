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

                <div class="ask-me"><h2>Welcome to AskMeAnything</h2></div>
                <div className="home-pages">  
                    <Link to = "/login" >
                        <div className='home-box'>questions per keyword graph/table</div>
                    </Link>
                    <Link to = "/login" >
                        <div className='home-box'> questions per day/period graph/table</div>
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
