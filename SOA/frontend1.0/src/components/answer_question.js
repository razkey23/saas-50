import React, { Component } from "react";
import Select from "react-select";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
//import { useTable } from 'react-table'; not sure which table to use
import axios from 'axios'
import Cookies from "universal-cookie";
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";


const cookies = new Cookies();
const baseUrl = 'http://localhost:8000'
export default class Answer extends Component {

    constructor() {
        super();
        this.state = {
            questionAnswered: {},
            keywords: [],
            answers: [],
            questions: [],
            answer:'',
            token: cookies.get('token')
        }
    }

    routeChange() {
        let path = `/mypage`;
        this.props.history.push(path);
    }

    componentDidMount(){
        // fetch questions from database
    }

    getAnswer(e) {
        axios({
            method: 'GET',
            url: `${baseUrl}/AnswersOfQuestion`,
        }).then(function(response) {
            this.setState({
                answer: e.target.value
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
        const userId = jwt(this.state.token).id;
        axios({
            method: 'POST',
            url: `${baseUrl}/AddAnswer`,
            //headers: {'X-OBSERVATORY-AUTH': `${token}`},
            data: {
                userId: userId,
                question: this.state.questionAnswered,
                text: this.state.answer,
                date: (new Date()).toString()
            }
        }).then(function(response) {
            this.history.push('/myhomepage')
        }).catch(function(error) {
            alert(error)
        })
        
    }


    render() {
        const columns= [
            {
                label: 'Username',
                field: 'username',
                sort: 'asc',
            },
            {
                label: 'Answer',
                field: 'Answer',
                sort: 'asc',
            },
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
                        <MDBTable 
                            scrollY
                            bordered
                            striped
                        >
                            <MDBTableHead columns={columns} />
                            <MDBTableBody rows={this.state.answers.map((item)=>({
                                name: item.name,
                                answer: item.user_type
                            }))}/>
                        </MDBTable>
                        {/*<textarea className="form-control" rows="5" style={{resize:"none"}} placeholder="Available Answers"></textarea>*/}
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
