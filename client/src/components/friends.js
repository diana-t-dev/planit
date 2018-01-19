import React, { Component } from 'react';
import '../App.css';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import $ from "jquery";
import axios from "axios";
import Cookies from 'universal-cookie';
import Login from './login.js';
import Nav from './nav.js'

const cookies = new Cookies();

class Friends extends Component {


  state = {

    users: [],
    friends: [],
    id: ""
  };

  getFriends = () => {

let namey = cookies.get('name');

    axios.get('/friends/'+namey).then(friend =>{

      console.log(friend);


      this.setState({

        users: friend.data.data.names,
        friends: friend.data.data.daty

      })
    })

  };

  getUser = () => {

let namey = cookies.get('name');

 axios.get('/users/'+namey).then(user =>{

  console.log(user);

  user.data && user.data[0] ? (


this.setState({

  id: user.data[0].id
})
):
(
""
  )

})
  };

    addFriend = (i) => {

let namey = cookies.get('name');

let friend = i;

let data = {

	user: namey,
  ids: this.state.id,
	to: friend,
	type: "friend request"
}

    axios.post('/notification', {data}).then(friend =>{

      console.log(friend);
    })

  };

      delFriend = (i) => {

let namey = cookies.get('name');

let friend = i;

let data = {

  user: namey,
  friend: friend.i
}

    axios.put('/delfriend', {data}).then(friend =>{

      console.log(friend);
    })

  };


  componentDidMount(){

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
    }
  );

}

 render() {
    return (

 cookies.get('name') === undefined ? (<Login {...this.props}/>):(


<div>
  <Nav/>
   <div className="row">
<div className="col s12 top z-depth-2">
<h1 className="center">My Friends</h1>
</div>
</div>
<div className="container">

<div className="row">
<div className="col s12">

<a className='dropdown-button btn material-icons left add-friend' href='#' data-activates='dropdown1'>Add Friend</a>

    <ul id='dropdown1' class='dropdown-content'>

{

  this.state.users.map(i => {
  return <li><a type="button" className="addFriend" data-id="username" onClick={() => this.addFriend(i.username)}>{i.username}</a></li>

        })
}

    </ul>
    <table className="table highlight">
      <thead>
        <tr>
          <th>Name</th>
          <th>See Friend's Groups</th>
          <th>Friend Online</th>
        </tr>
      </thead>
      <tbody>
        
  
  {

    this.state.friends !== undefined ? (

  this.state.friends.map(i => {
      <tr>
     <td className="namey">{i.name}</td>
             <td><a href="/friends">{i.name}'s Groups</a></td>
             <td>*</td>
             <td><a className="waves-effect waves-light btn delfriend" onClick={() => this.delFriend(i.name)}>Remove Friend</a></td>
        
</tr>
         })

  ):

    (

       <tr>
     <td className="namey">You Have No Friends!</td>
     </tr>


      )

}     
         
      </tbody>
    </table>
    </div>
    </div>
    </div>
</div>

)
);

};

};

export default Friends;