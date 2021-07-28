import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import jwt from 'jwt-decode'


export default class ContribUserDate extends Component {

    constructor(){
        super()
        this.state={
            startDate:'',
            endDate:'',
            questions: []
        }
        this.handleApply = this.handleApply.bind(this)
    }

    handleApply(event, picker) {
        var d1 = new Date(picker.startDate), d2 = new Date(picker.endDate);
        const userId = jwt(localStorage.getItem("token")).id;
        this.setState({
            startDate: [d1.getFullYear(), ('0'+(d1.getMonth()+1)).slice(-2), ('0'+(d1.getDate())).slice(-2)].join('-'),
            endDate: [d2.getFullYear(), ('0'+(d2.getMonth()+1)).slice(-2), ('0'+(d2.getDate())).slice(-2)].join('-')
        });
        axios({
          method: 'POST',
          url: `http://localhost:3001/proxy`,
          body: {
            "endpoint": "ContribUserPerDay",
            "datefrom": this.state.startDate,
            "dateto": this.state.endDate,
            "user": userId,
            "method": "GET"
          },
          Headers:{
            "Authorization": "Bearer "+localStorage.getItem("token")
          }
        }).then(function(response) {
            this.setState({
            questions: response
        })
        }).catch(function(error) {
          alert(error)
        })
    }
    render() {
        //these to be changed to the fields we want to show
        var columns = [
            { dataField: 'id', text: 'Id' },
            { dataField: 'name', text: 'Name' },
            { dataField: 'animal', text: 'Animal' },
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
                            <Link className="nav-link" to={"/signup"}>SignUp</Link>
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
                <div style={{marginTop:50+"px", marginLeft:50+"px"}}>
                <h2>Select Date</h2>
                <DateRangePicker onApply={this.handleApply}>
                    <input />
                </DateRangePicker>
                </div>
                <h2 style={{marginTop:50+"px", marginLeft:50+"px"}}>Questions in the selected date range</h2>
                <div style={{marginTop:50+"px", marginLeft:50+"px", marginRight:50+"px"}}>
                    <BootstrapTable
                        data={ this.state.questions }
                        columns={ columns }
                        keyField='id'>
                    </BootstrapTable>
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
