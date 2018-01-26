import React from "react";
import '../App.css';
import { Link } from "react-router-dom";


const Nav = props => (
<div class="header">
  <nav className="transparent z-depth-0">
    <a class="brand-logo"><Link to="/"><i class="material-icons">home</i>Dashboard</Link></a>
    <a className="head center"><Link to="/">p l a n I t </Link></a>
    <ul id="nav-mobile" className="right hide-on-med-and-down navTab">
      <li className="navTab"><Link to="/friends">Friends</Link></li>
      <li className="navTab"><Link to="/groups">Groups</Link></li>
      <li className="navTab"><Link to="/notifications">Notifications</Link></li>
      <li className="navTab"><Link to="/logout">Logout</Link></li>   
    </ul>
  </nav>
  
  <section className="video-container">
  <video src="http://images.all-free-download.com/footage_preview/mp4/fun_fair_girls_people_ride_352.mp4" autoPlay loop></video>
  <div className="callout">
    
    <div>
      <p className="navDescription">A place that helps you plan out things with your friends</p>
    </div>
  </div>
</section>
</div>

);

export default Nav;