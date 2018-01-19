import React, { Component } from "react";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';



class Notifications extends Component {
    state = {
        notifications: []
     
    }

    componentDidMount () {

    	 this.setState({notifications: []})
        // set new cookie
        const cookies = new Cookies();
        cookies.set('name', 'Jesus');
        
        // get request for user notifications
        axios.get(`/notifications/${cookies.get('name')}`)
        .then((results) => {

        	console.log(results)
            // set state equal to notifications
           
            // if user has none, display a message
            if (results.data[0] === undefined) {
            	
                this.setState({notifications: ['none']});
            }
            // else, set the state to their notifications as a list
            else {
                // notifications = notifications.split(",");
                

                // results.data.forEach(i =>{

                // 	   this.setState({

                //     notifications: [...this.state.notifications, i.user, i.type]
                // })
                // })

                let notifications = results.data.map((notification) => {
                    return {from: notification.user, type: notification.type}
                })

                this.setState({notifications: notifications});

             
                console.log(notifications);


              	
            }
        })
    }

    render() {

        return (

        	<div>
        <div className="row">
            <div className="col s12 top z-depth-2">
                <h1 className="center">My Notifications</h1>
            </div>
            </div>
            <div className="container">
            <div className="row">
            <div className="col s12">
            <table>
                <thead>
                <tr>
                    <th>From</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>

                {this.state.notifications.map( (el) => {

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
                        <td><a className="btn">Accept</a><a className="btn">Decline</a></td>
                        </tr>
                  }
                })}
                </tbody>
            </table>
        </div>
        </div>
        </div>
        </div>
        );
    }
} 

export default Notifications;