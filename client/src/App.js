import React, { Component } from 'react';
import './App.css';
import Login from "./components/login.js";
import Logout from "./components/logout.js";
import Home from "./components/home.js";
import NoMatch from "./components/nomatch.js";
import Friends from "./components/friends.js";
import Groups from "./components/groups.js";
import Notifications from "./components/notifications.js";
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



class App extends Component {



componentDidMount(){


}

  render() {

    return (
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/friends" component={Friends} />
                <Route exact path="/groups" component={Groups} />
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/logout" component={Logout} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
    )}
}


export default App;