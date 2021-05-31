import React, { Component } from "react";
import Select from "react-select";


export default class Ask extends Component {

    
  render() {
    return (
        <div>
            <div className="verical-orientation">
                <div class="ask-me" style={{paddingLeft:5+"%", paddingBottom:2+"em"}}>Ask a question</div>
                <div className="horizontal-orientation">
                    <label style={{width:20+'%'}}>Question title:</label>
                    <input type="text" className="form-control"></input>
                </div>

                <div className="horizontal-orientation">
                    <label style={{width:20+'%'}}>Question text:</label>
                    <textarea className="form-control" rows="5" style={{resize:"none"}}></textarea>
                </div>

                <div className="horizontal-orientation">
                    <label style={{width:20+'%'}}>Keywords:</label>
                    <input type="text" className="form-control"></input>
                </div>
                
                <div className="buttons" style={{marginLeft:"20%"}}>
                    <button style={{width:40+"%"}}>Submit</button>
                    <button style={{width:40+"%"}}>Cancel</button>
                </div>
            </div>
        </div>
      
    );
  }
}
