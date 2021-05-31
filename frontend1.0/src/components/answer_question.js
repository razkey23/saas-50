import React, { Component } from "react";
import Select from "react-select";


export default class Answer extends Component {

    
  render() {
    return (
        <div>
            
            
            <div className="verical-orientation text-align-right"  style={{width:90+"%",marginLeft:5+"%"}}>
                <div class="ask-me" style={{paddingLeft:0, paddingBottom:2+"em"}}>Answer a question</div>
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
                    <textarea className="form-control" rows="5" ></textarea>
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
