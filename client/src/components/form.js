import React, { Component } from "react";
import '../App.css';
import $ from "jquery";
import Cookies from 'universal-cookie';
import axios from "axios";

const cookies = new Cookies();

class Form extends Component {

	state = {
		users: [],
		friends: [],
		groupName: "",
		groupMembers: [],
		friendIds: [],
		id: "",
		groupId: ""
	}

	componentDidMount () {
		this.getUser();
		this.getFriends();
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    })
	}

	getUser = () => {
    let name = cookies.get('name');
    axios.get('/users/' + name).then(user => {
      console.log(user);
      user.data && user.data[0] ? (this.setState({ id: user.data[0].id })) :("")
    })
  };

	// adds friend to group and updates state of group
	addToGroup = (friendName) => {
		// match friend name to friend id
		let friendId = this.state.friendIds[this.state.friends.indexOf(friendName)];
		console.log(`friendId: ${friendId}`);
		// add friend to group
		this.state.groupMembers.push(friendId);
		console.log(this.state.groupMembers);
		// update group members state
		this.setState({groupMembers: this.state.groupMembers});
	}

	handleGroupName = (event) => {
		this.setState({groupName: event.target.value});
	}

	
	// renders friends in dropdown
	getFriends = () => {
    let userid = cookies.get('id');
    axios.get('/friends/' + userid).then(friend => {
      if (friend.data.data.daty===undefined) {
        this.setState({
          users: friend.data.data.names
        })
      }
      else{
				
        this.setState({
          users: friend.data.data.names,
					friends: friend.data.data.daty,
					friendIds: friend.data.data.friendIds
        })        
      }
    })

	};
	
	// creates group in db and sends notifications to added members
	createGroup = (event) => {
		event.preventDefault();
		let userid = cookies.get('id');
		let groupInfo = {
			groupName: this.state.groupName,
		}

		// create new group record
		axios.post('/groups/new/' + userid, groupInfo).then(results => {
			console.log(results.data);
			this.setState({groupId: results.data.id});
			console.log(`STATE ID ${this.state.id}`);
			console.log(`STATE GROUP ID ${this.state.groupId}`);
			axios.post(`/groups/members/${this.state.id}/${this.state.groupId}`).then(results => {
				console.log(results);
			});
			// send notifications to all group members
			for (let i=0; i < this.state.groupMembers.length; i++) {
				let groupNotification = {
					user: cookies.get('name'),
					ids: this.state.id,
					to: this.state.groupMembers[i],
					type: 'Group Invite',
					groupId: this.state.groupId
				}
				axios.post('/notification', groupNotification).then(results => {
					console.log(results);
				});
			}		
		});


	}
 
 render() {
 return (
		 <div className="wrapper">
			 <div className="row">
				 <div className="col s6 offset-s3 ">
					 <div className="card">
						 <div className="card-image">
							 <img src="https://68.media.tumblr.com/607d816927c95f49d278f04a96c5d421/tumblr_o4utp2WbL81tforevo1_1280.gif" />
						 </div>
						 <div className="card-content">
							 <div className="row">
								 <form className="col s6 offset-s3">
									 <div className="input-field col s12">
										 <i className="material-icons icon-blue prefix">create</i>
										 <input id="icon_name" type="text" className="validate" onChange={(event) => this.handleGroupName(event)} />
										 <label for="icon_name">What would you like to name your group?</label>
									 </div>
								 </form>
							 </div>
							 <div className="row">
								 <form className="col s6 offset-s3">
									 <div className="input-field col s12">
										 <i className="material-icons icon-blue prefix">face</i>
										 <a className='dropdown-button btn material-icons left add-to-group #42a5f5 blue lighten-1 ' href='#' data-activates='friend-dropdown'>Add friends to this group</a>
										 <ul id='friend-dropdown' className='dropdown-content'>
											 {this.state.friends.map(friend => <li key={friend}><a type="button" className="addFriend" data-id="username" onClick={() => this.addToGroup(friend)}>{friend}</a></li>)}
										 </ul>
									 </div>
									 <div className="center">
										 <a type="button" className="waves-effect #42a5f5 blue lighten-1 btn" onClick={(event) => this.createGroup(event)}>Submit</a>
									 </div>
								 </form>
							 </div>
						 </div>
					 </div>


				 </div>
			 </div>
		 </div>


	 )
 }
};

export default Form;

