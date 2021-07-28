import React, { Component } from "react";
import Select from "react-select";
import axios from 'axios'
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";


export default class Answer extends Component {

    constructor() {
        super();
        this.state = {
            questionAnswered: {},
            keywords: [],
            answers: [],
            questions: [],
            answer:'',
        }
    }

    routeChange() {
        let path = `/mypage`;
        this.props.history.push(path);
    }

    componentDidMount(){
        // fetch questions from database get all questions
    }

    getAnswer(e) {
        axios({
            method: 'POST',
            url: `http://localhost:3001/proxy`,
            body: {
              "endpoint": "AnswersOfQuestion",
              "keyword": this.state.keyword,
              "method": "GET"
            },
        }).then(function(response) {
            this.setState({
                answer: response
            })
        }).catch(function(error) {
            alert(error)
        })
    }

    getQuestion(e){
        this.setState({
            keywords: e.keywords.join(', '),
            questionAnswered: e,
        }, () => this.getAnswer(e.id))
    }

    submitAnswer(){
        const userId = jwt(localStorage.getItem("token")).id;
        const date = new Date();
        axios({
            method: 'POST',
            url: `http://localhost:3001/proxy`,
            body: {
                "endpoint": "AddAnswer",
                "user": {"id": userId},
                "question": this.state.questionAnswered,
                "text": this.state.answer,
                "date_asked": [date.getFullYear(), ('0'+(date.getMonth()+1)).slice(-2), ('0'+(date.getDate())).slice(-2)].join('-'),
                "method": "POST"
            },
            Headers:{
              "Authorization": "Bearer "+localStorage.getItem("token")
            }
        }).then(function(response) {
            this.props.history.push('/myhomepage')
        }).catch(function(error) {
            alert(error)
        })       
    }


    render() {
        var columns = [
            { dataField: 'id', text: 'Id' },
            { dataField: 'text', text: 'Answer' },
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
                <div className="verical-orientation text-align-right"  style={{width:90+"%",marginLeft:5+"%"}}>
                    <div class="ask-me" style={{paddingLeft:0, paddingBottom:2+"em"}}>Answer a question</div>
                    {/* make it be a select from all the questions */}
                    <Select
                        class="form-control"
                        placeholder="Question title"
                        options={this.state.questions}
                        getOptionLabel={(option)=>option.desc}
                        getOptionValue={(option)=>option.id}
                        onChange={e => this.getQuestion(e)}
                    />
                    <div style={{height:1+"em"}}></div>
                    <input readOnly type="text" className="form-control" placeholder="(kewywords,read-only)" value={this.state.keywords}></input>
                    <div style={{height:1+"em"}}></div>
                    {/* make it be a select from all the questions */}
                    <div className="form-group " style={{height:300+"px"}}>
                        <label style={{width:20+'%'}}>Available Answers:</label>
                        <div style={{marginTop:10+"px"}}>
                            <BootstrapTable
                                data={ this.state.answers }
                                columns={ columns }
                                keyField='id'>
                            </BootstrapTable>
                        </div>
                    </div>
                    

                    <div className="form-group">
                        <label style={{width:20+'%'}}>Your Answer:</label>
                        <textarea className="form-control" rows="5" onChange={e => this.getAnswer(e)}></textarea>
                    </div>
                    
                    <div className="buttons">
                        <button style={{width:40+"%"}} onClick={() => this.submitAnswer()}>Submit answer</button>
                        <button style={{width:40+"%"}} onClick={() => this.routeChange()}>Never mind</button>
                    </div>
                </div>
            </div>
        );
    }
}
