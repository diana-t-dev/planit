import React, { Component } from 'react';
import '../App.css';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import $ from "jquery";

class Friends extends Component {


  componentDidMount(){

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


<div>
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

      <li><a type="button" className="addFriend" data-id="username">name</a></li>
      <li><a type="button" className="addFriend" data-id="username2">name2</a></li>
  
    </ul>
    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Name</th>
          <th>See Friend's Groups</th>
          <th>Friend Online</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          
            <td className="namey">name</td>
            <td><a href="/friends">name's Groups</a></td>
            <td>*</td>
            <td><a className="waves-effect waves-light btn delfriend">Remove Friend</a></td>
       
         </tr>
      </tbody>
    </table>
    </div>
    </div>
    </div>
</div>

);

};

};

export default Friends;