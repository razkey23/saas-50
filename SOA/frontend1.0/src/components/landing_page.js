import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Login extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div class="ask-me"><h2>Welcome to AskMeAnything</h2></div>
                <div className="home-pages">  
                    <Link to = "/login" >
                        <div className='home-box'>questions per keyword</div>
                    </Link>
                    <Link to = "/login" >
                        <div className='home-box'> questions per day/period</div>
                    </Link>
                    <Link to = "/login" >
                        <div className='home-box'> ask new question</div>
                    </Link>
                    <Link to = "/login" >
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
