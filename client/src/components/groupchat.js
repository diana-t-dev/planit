import React, { Component } from "react";
import '../App.css';

class Chat extends Component {

  componentDidMount () {

  }

render() { 

  return ( 

        <div className="col s3 m3 l3">
          <div className="col s12 top z-depth-2">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="https://cdn.dribbble.com/users/1719/screenshots/1776161/1.gif"/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Chat<i class="material-icons right"></i></span>
                <p><a href="#">link placeholder</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Chat<i class="material-icons right">close</i></span>
                <p>populate chat here</p>
              </div>
            </div>
          </div>
        </div>
    );
  };

};

export default Chat;