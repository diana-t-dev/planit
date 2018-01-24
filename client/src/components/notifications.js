import React, { Component } from "react";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Login from './login.js';
import Nav from './nav.js';
import Footer from './footer.js';


const cookies = new Cookies();



class Notifications extends Component {
    state = {
        notifications: [],
        user: "",
        id: ""
    }

    componentDidMount () {
        let namey = cookies.get('name');
    
        axios.get('/users/' + namey).then(user => {
    
          console.log(user);
    
          user.data && user.data[0] ? (  this.setState({ id: user.data[0].id })) :("")

          console.log(this.state.id);
    
        }).then(results => {
            this.renderNotifications();
        })
    }

    renderNotifications = () => {
        console.log('render');
        // get request for user notifications
        axios.get(`/notifications/${this.state.id}`)
        .then((results) => {
            console.log(`render results ${results}`);           
            // if user has none, display a message
            if (results.data[0] === undefined) {
            	
                this.setState({notifications: ['none']});
            }
            // else, set the state to their notifications as a list
            else {
                let notifications = results.data.map((notification) => {
                    console.log(notification);
                    return {id: notification.id, userId: notification.userId, from: notification.user, type: notification.type, groupId: notification.groupId}
                })
                this.setState({notifications: notifications});
              	
            }
        })
    }

    deleteNotification = (notificationId) => {

        axios.delete(`/notifications/delete/${notificationId}`)
             .then((results) => {
                 this.renderNotifications();
             })
    }

    acceptRequest = (notificationId, userRequestId, notificationType, userId, groupId) => {
        // if it's a friend request, update both users' friends list
        if (notificationType === 'friend request') {
            axios.post(`/friends/update/${userRequestId}`, {friendId: userId})
             .then((results) => {
                 axios.post(`/friends/update/${userId}`, {friendId: userRequestId})
                      .then((results) => {
                          this.deleteNotification(notificationId);
                      });
             });
        }
        // if it's a group request, update group members and add group id to user record
        // then delete notifications
        else if (notificationType === 'Group Invite') {
            console.log(`groupId ${groupId}`);
            axios.post(`/groups/members/${userId}/${groupId}`)
                 .then(results => {
                     console.log(results);
                    //  axios.post(`/newgroup/${userId}/${groupId}`)
                    //       .then(results => {
                    //           console.log(results);
                    //           this.deleteNotification(notificationId);
                    //       })
                 })
        }
        
    }

    render() {

        return (

 cookies.get('name') === undefined ? (<Login {...this.props}/>):(

<div>
    <Nav/>
        
                <h1 className="center titles groupText">My Notifications</h1>
       
        <div className="container">
            <div className="row toprow">
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
                            return <tr key={el.id}>
                                <td>{el.from}</td>
                                <td>{el.type}</td>
                                <td><a className="btn" data-id={el.id} onClick={() => this.acceptRequest(el.id, el.userId, el.type, this.state.id, el.groupId)}>Accept</a><a className="btn" data-id={el.id} onClick={() => this.deleteNotification(el.id)}>Decline</a></td>
                            </tr>
                            }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <Footer/>
    </div> )
        );
    }
} 

export default Notifications;