import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Login extends Component {

    constructor() {
        super();
    
        this.test = this.test.bind(this);
      }
      test() {
        alert("function executed on clicking div");
      }
  render() {
    return (
        <div>
            <div class="ask-me">My.AskMeAnything</div>
            <div className="home-pages">  
                <Link to = "/login" >
                <div className='home-box'>My questions<br/><br/>My answers</div>
                </Link>
                <Link to = "/login" >
                    <div className='home-box'>My contributions per day</div>
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
