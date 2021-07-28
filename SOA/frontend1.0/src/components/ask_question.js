import React, { Component } from "react";
import jwt from 'jwt-decode'
import axios from 'axios'
import { Link } from "react-router-dom";
import Select from "react-select";

export default class Ask extends Component {

    constructor() {
        super();
        this.state = {
            init_keywords: [
                {'id':1,"name": "Machine-Learning"},
                {'id':2,"name": "AI"},
                {'id':3,"name": "Python"},
                {'id':4,"name": "Java"},
                {'id':5,"name": "C++"},
                {'id':6,"name": "Javascript"},
                {'id':7,"name": "Algorithms"},
                {'id':8,"name": "Graph Theory"},
                {'id':9,"name": "Haskell"}
            ],            question_name: '',
            question_text: '',
            keywords: [],
        }
    }

    sumbitQuestion(){
        const userId = jwt(localStorage.getItem("token")).id;
        const date = new Date();
        axios({
          method: 'POST',
          url: `http://localhost:3001/proxy`,
          body: {
            "userId": userId,
            "title": this.state.question_name,
            "text": this.state.question_text,
            "keywords": this.state.keywords,
            "date_asked": [date.getFullYear(), ('0'+(date.getMonth()+1)).slice(-2), ('0'+(date.getDate())).slice(-2)].join('-'),
            "method": "POST"
          },
          Headers:{
            "Authorization": "Bearer "+localStorage.getItem("token")
          }
        }).then(function(response) {
          this.props.history.push('/mypage');
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
            keywords: evt
        })
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
                    
                    <div style={{paddingLeft:5+"%", width:95+"%", marginBottom:50+"px"}}>
                        <label style={{width:20+'%', marginBottom:10+"px"}}>Select Keywords:</label>
                        <Select
                            class="form-control"
                            placeholder="Select Keyword"
                            isMulti
                            options={this.state.init_keywords}
                            getOptionLabel={(option)=>option.name}
                            getOptionValue={(option)=>option.id}
                            onChange={e => this.updateKeywords(e)}
                        />
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
