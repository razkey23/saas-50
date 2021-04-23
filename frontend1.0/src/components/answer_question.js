import React, { Component } from "react";
import Select from "react-select";


export default class Answer extends Component {

    
  render() {
    return (
        <div>
            <div class="ask-me">Answer a question</div>
            
            <div className="verical-orientation"  style={{width:90+"%"},{marginLeft: 5+"%"}}>
                {/* make it be a select from all the questions */}
                <input type="text" className="form-control" placeholder="question tiles"></input>
                <div style={{height:1+"em"}}></div>
                <input readOnly type="text" className="form-control" placeholder="(kewywords,read-only)"></input>
                <div style={{height:1+"em"}}></div>
                {/* make it be a select from all the questions */}
                <div className="form-group">
                    <textarea className="form-control" rows="5" style={{resize:"none"}} placeholder="other answers, if available, can be shown here"></textarea>
                </div>
                

                <div className="form-group">
                    <label style={{width:20+'%'}}>Keywords:</label>
                    <input type="text" className="form-control"></input>
                </div>
                
                <div className="buttons">
                    <button style={{width:40+"%"}}>Submit answer</button>
                    <button style={{width:40+"%"}}>Never mind</button>
                </div>
            </div>
        </div>
      
    );
  }
}
