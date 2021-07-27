import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login"
import SignUp from "./components/signup"
import Landing from "./components/landing_page"
import HomePage from "./components/home_page"
import MyPage from "./components/my_page"
import Ask from "./components/ask_question"
import Answer from "./components/answer_question"

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {/* <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/landing"}>Landing</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/homepage"}>Home Page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/mypage"}>My Page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/ask"}>Ask</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/answer"}>Answer</Link>
              </li>
            </ul>  */}
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Home-page</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/logout"}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/landing" component={Landing} />
            <Route path="/homepage" component={HomePage} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/ask" component={Ask} />
            <Route path="/answer" component={Answer} />
          </Switch>
      </div>
    </div></Router>
  );
}

export default App;
