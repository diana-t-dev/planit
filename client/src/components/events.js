import React, { Component } from "react";
import '../App.css';

class Events extends Component {

  componentDidMount () {

  }

render() { 

  return ( 

  
        <div className="col s8 m7 l7">
        <div className="col s12 top z-depth-2 bordy2 hoverable">
           <h4>Selected Group Name, Members</h4>
           <hr/>
           <div className="col s10 offset-s1">
           <div className="eventy">
           <p>Event 1 Here - Posted By Here</p>
              <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <p>Vote up/down button here - add comment button here</p>
           </div>
           <div className="eventy">   
           <p>Event 2 Here - Posted By Here</p>
           <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <p>Vote up/down button here - add comment button here</p></div>
           <div className="eventy">
              <p>Event 3 Here - Posted By Here</p>
              <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <p>Vote up/down button here - add comment button here</p></div>

           <div className="eventy">
              <p>Event 4 Here - Posted By Here</p>
              <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <p>Vote up/down button here - add comment button here</p></div>

           </div>
          </div>
          </div>

    );
  };

};

export default Events;