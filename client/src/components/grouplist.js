import React, { Component } from "react";
import '../App.css';

class List extends Component {

  componentDidMount () {

  }

render() { 

  return ( 
  
<div>
        <div className="col s2 m2 l2">
        <div className="col s12 top z-depth-2">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="https://cdn.dribbble.com/users/35017/screenshots/1462625/follow_2x.gif"/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Group Names<i class="material-icons right"></i></span>
                <p><a href="#">Leaving this link here just in case we need it</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Group Names<i class="material-icons right">close</i></span>
                <p>This is where we'll populate our groups list</p>
              </div>
            </div>
            </div>
        
      </div>
  </div>

     );

  };

};

export default List;