import React, { Component } from "react";
import '../App.css';
import axios from 'axios';

class Notifications extends Component {
    state = {
        user: 'bob',
        notifications: ['test 1']
    }

    componentDidMount () {
        axios.get(`/notifications/${this.state.user}`)
        .then((results) => {
            let notifications = results.data[0].notifications.split(",");
            this.setState({notifications: notifications});
        })
    }

    render() {
        return (
        <div className="row">
            <div className="col s12 top z-depth-2">
                <h1 className="center">My Notifications</h1>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Notification Message</th>
                </tr>
                </thead>
                <tbody>
                {this.state.notifications.map(notification => {
                    return <tr><td>{notification}</td><td><a className="btn">Accept</a><a className="btn">Decline</a></td></tr>
                })}
                </tbody>
            </table>
        </div>
        );
    }
} 

export default Notifications;