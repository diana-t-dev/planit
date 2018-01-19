import React, { Component } from "react";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Login from './login.js';


const cookies = new Cookies();



class Notifications extends Component {
    state = {
        notifications: [],
        deletion: false,
        user: ""
    }

    componentDidMount () {
        this.renderNotifications();
    }

    renderNotifications = () => {
        this.setState({notifications: []})

        // set new cookie
        const cookies = new Cookies();

        cookies.set('name', 'Ben');

        axios.get(`/users/${cookies.get('name')}`).then(user =>{       
            this.setState({user: user.data[0].id})
        })

        // get request for user notifications
        axios.get(`/notifications/${cookies.get('name')}`)
        .then((results) => {           
            // if user has none, display a message
            if (results.data[0] === undefined) {
            	
                this.setState({notifications: ['none']});
            }
            // else, set the state to their notifications as a list
            else {
                let notifications = results.data.map((notification) => {
                    return {id: notification.id, userId: notification.userId, from: notification.user, type: notification.type}
                })
                this.setState({notifications: notifications});
              	
            }
        })
    }

    deleteNotification = (notificationId) => {
        this.setState({deletion: !this.state.deletion});
        this.renderNotifications();

        console.log(notificationId);
        axios.delete(`/notifications/delete/${notificationId}`)
             .then((results) => {
                 console.log(results);
             })
    }

    acceptRequest = (notificationId, userRequestId, notificationType, userId) => {
        console.log(`user id sending request: ${userRequestId}`);
        // if it's a friend request, update both users' friends list
        axios.post(`/friends/update/${userRequestId}`, {friendId: userId})
             .then((results) => {
                 axios.post(`/friends/update/${userId}`, {friendId: userRequestId})
                      .then((results) => {
                          this.deleteNotification(notificationId);
                      });
             });
        

        // if it's a group request, update group members
        // then delete notifications
    }

    render() {

        return (

 cookies.get('name') === undefined ? (<Login />):(

        	<div>
        <div className="row">
            <div className="col s12 top z-depth-2">
                <h1 className="center">My Notifications</h1>
            </div>
            </div>
            <div className="container">
            <div className="row">
            <div className="col s12">
            <table className="table highlight">
                <thead>
                <tr>
                    <th>From</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>

                {this.state.notifications.map( (el) => {

                    console.log(el);

                	if (el === 'none') {

                		return <tr>
                        <td>No Notifications</td>
                        </tr>
                		
                    }
                    else
                	{

                		return <tr>
                        <td>{el.from}</td>
                        <td>{el.type}</td>
                        <td><a className="btn" data-id={el.id} onClick={() => this.acceptRequest(el.id, el.userId, el.type, this.state.user)}>Accept</a><a className="btn" data-id={el.id} onClick={() => this.deleteNotification(el.id)}>Decline</a></td>
                        </tr>
                  }
                })}
                </tbody>
            </table>
        </div>
        </div>
        </div>
        </div>
    )
        );
    }
} 

export default Notifications;