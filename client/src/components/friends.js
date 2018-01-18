import React from "react";
import '../App.css';

const Friends = props => (

<div>
   <div className="row">
<div className="col s12 top z-depth-2">
<h1 className="center">My Friends</h1>
</div>
</div>
<div className="container">

<div className="row">
<div className="col s12">

<a class='dropdown-button btn material-icons left add-friend' href='#' data-activates='dropdown1'>Add Friend</a>

    <ul id='dropdown1' class='dropdown-content'>

      <li><a type="button" class="addFriend" data-id="username">name</a></li>
      <li><a type="button" class="addFriend" data-id="username2">name2</a></li>
  
    </ul>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name:</th>
          <th>See Friend's Groups</th>
          <th>See Friend's Events</th>
        </tr>
      </thead>
      <tbody>
        <tr id="form-row">
          <form id="author-form">
          
            <td>name</td>
            
            <td><a href="/friends">name's Groups</a></td>
            <td><a href="/friends">name's Events</a></td>
            <td><a class="waves-effect waves-light btn delfriend">Remove Friend</a></td>
         
         
        </form>
         </tr>
      </tbody>
    </table>
    </div>
    </div>
    </div>
</div>

);

export default Friends;