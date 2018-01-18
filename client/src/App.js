import React, { Component } from 'react';
import './App.css';
import Login from "./components/login.js";
import Logout from "./components/logout.js";
import Home from "./components/home.js";
import Footer from "./components/footer.js";
import NoMatch from "./components/nomatch.js";
import Friends from "./components/friends.js";
import Groups from "./components/groups.js";
import Notifications from "./components/notifications.js";
import Nav from "./components/nav.js";
import axios from 'axios';
import io from "socket.io-client";
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'react-notifications/lib/notifications.css';
import $ from "jquery";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const colors = {
  backgroundColor: "dodgerblue"
};


  const addMessage = data => {
    console.log(data);
 
 	NotificationManager.success("User: " + data.user + " Score: " + data.score, 'NEW TOP SCORE!');

};


class App extends Component {

state = {
 
    user: "",
    loggedin: false
  };

    socket = io("/");

     inputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  };


  score = () => {

    if (this.state.topUser.match("^[a-zA-Z]{1,10}$") != null){

this.setState({
      user:this.state.topUser,
      newTopScore: false,
      correct: "Submitted! Play Again!"
    });

    //     this.socket.emit('SEND_MESSAGE', {

    //     user: this.state.topUser,
    //     score: this.state.TopScore
    // });  
  }

  else {

    this.setState({

      error: "Invalid Name!"
    })
  }

};


componentDidMount(){

// 	 this.socket.on('RECEIVE_MESSAGE', (data) =>{

//     addMessage(data);


// });

 cookies.set('name', 'Ben');

    this.setState({

      user: cookies.get('name')
    })

}

  render() {
    return (
      <div>

            {this.state.user === "" ? (
      
      <Login />
)
:
(

           <Router>
      <div>
<Nav />
		
  <NotificationContainer/>
  
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/groups" component={Groups} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route component={NoMatch} />
      </Switch>
<Footer />
  </div>
  </Router>
      )}
</div>
    )
  }
}


export default App;