import axios from "axios";
import React, { Component } from "react";

const baseUrl = 'http://localhost:8000'

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
            <div className="footer">
                <p>about</p>
                <p>contact us</p>
                <p>project documentation</p>
                <p>link on github</p>
                <p>cource materials</p>
            </div>
        );
    }
}
