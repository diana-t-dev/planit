import React, { Component } from "react";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Notifications extends Component {
    state = {
        notifications: ['notification']
    }

    componentDidMount () {
        const cookies = new Cookies();
        cookies.set('name', 'bob');
        
        axios.get(`/notifications/${cookies.get('name')}`)
        .then((results) => {
            let notifications = results.data[0].notifications;
            if (!notifications) {
                this.setState({notifications: ["No notifications!"]})
            }
            else {
                notifications = notifications.split(",");
                this.setState({notifications: notifications});  
            }
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
                    if (notification === "No notifications!") {
                        return <tr><td>{notification}</td></tr>
                    }
                    else {
                        return <tr><td>{notification}</td><td><a className="btn">Accept</a><a className="btn">Decline</a></td></tr>
                    }
                })}
                </tbody>
            </table>
        </div>
        );
    }
} 

export default Notifications;