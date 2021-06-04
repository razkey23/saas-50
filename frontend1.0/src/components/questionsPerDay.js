import axios from "axios";
import React, { Component } from "react";

const baseUrl = 'http://localhost:8000'

export default class QuestionsPerDay extends Component {

    constructor(){
        super()
        this.state={
            date:'',
            questions:[]
        }
    }

    getDate(e) {
        //will be from a calendar, from to????
        this.setState({
            date: e
        })
    }

    loadQuestions(){
        axios({
            method: 'GET',
            url: `${baseUrl}/QuestionsPerDay`,
            data: {
              keyword: this.state.date,
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
