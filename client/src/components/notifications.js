import React, { Component } from "react";
import '../App.css';
import axios from 'axios';

class Notifications extends Component {
    state = {
        user: 'bob',
        notifications: null
    }

    componentDidMount () {
        axios.get(`/notifications/${this.state.user}`)
             .then((results) => {
                 this.setState({notifications: results});
                 return console.log(results);
             })
    }

    render() {
        return (
        <div className="row">
                <div className="col s12 top z-depth-2">
                <h1 className="center">My Notifications</h1>
                <a className="btn" onClick={this.getNotifications}>get notifications</a>
            </div>
        </div>
        );
    }
} 

export default Notifications;