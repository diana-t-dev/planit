import React from "react";
import '../App.css';
import { Link } from "react-router-dom";


const Nav = props => (
    <div className="navbar">
       <nav>
    <div className="nav-wrapper">
    
      <a href="" className="brand-logo logo"><Link to="/">Super Party Planner </Link></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        
        <li><Link to="/friends">Friends</Link></li>
        <li><Link to="/groups">Groups</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        
      </ul>
    </div>
  </nav>
  </div>
);

export default Nav;