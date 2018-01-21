import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

const Nav = props => (
  <div className="wrapper">
    <div className="navbar">

       <nav className="transparent z-depth-0">

          <div className="nav-wrapper">

            <div className="row">

              <div className="col s12">
    

                 <ul id="nav-mobile" className="right hide-on-med-and-down">
        
                  <li className="navTab"><Link to="/friends">Friends</Link></li>

                  <li className="navTab"><Link to="/groups">Groups</Link></li>
                  <li className="navTab"><Link to="/notifications">Notifications</Link></li>
                  <li className="navTab"><Link to="/logout">Logout</Link></li>
        
                </ul>

              </div>

            </div>

          </div>



      </nav>

            <section className="video-container">
                <video src="http://images.all-free-download.com/footage_preview/mp4/fun_fair_girls_people_ride_352.mp4" autoPlay loop></video>
                <div className="callout">
                  <h1 className="navbarTitle">S u p e r P a r t y P l a n n e r </h1>
                    <div>
                    <p className="navDescription">A place that helps you plan out things with your friends</p>
                    </div>
                 </div>   

            </section>  
  </div>

 


 </div> 
);

export default Nav;