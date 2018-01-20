import React, { Component } from "react";
import '../App.css';

class Events extends Component {

  componentDidMount () {

  }

render() { 

  return ( 

  
        <div className="col s7 m7 l7">
        <div className="col s12 top z-depth-2">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="https://media.giphy.com/media/3o6gbchrcNIt4Ma8Tu/giphy.gif"/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Group Events<i class="material-icons right"></i></span>
                <p><a href="#">link placeholder</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Group Events<i class="material-icons right">close</i></span>
                <p>This is where we'll populate our group events</p>
              </div>
            </div>
          </div>
          </div>

    );
  };

};

export default Events;