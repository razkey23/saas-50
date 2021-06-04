import axios from "axios";
import React, { Component } from "react";

const baseUrl = 'http://localhost:8000'

export default class QuestionsPerKeyword extends Component {

    constructor(){
        super()
        this.state={
            keyword:'',
            questions:[]
        }
    }

    componentDidMount(){
        //get alla available keywords??
    }

    loadQuestions(){
        axios({
            method: 'GET',
            url: `${baseUrl}/QuestionsPerKW`,
            data: {
              keyword: this.state.keyword,
            }
          }).then(function(response) {
            this.state.questions=response
          }).catch(function(error) {
            alert(error)
          })
    }

    render() {
        return (
            // TODO create how to display
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
