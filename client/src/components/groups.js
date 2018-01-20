import React, { Component } from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js';
import Footer from './footer.js';

const cookies = new Cookies();

class Groups extends Component {

  componentDidMount () {

  }

render() { 

  return ( 

cookies.get('name') === undefined ? (<Login {...this.props}/>):(
  
<div>
  <Nav/>
  <div className ="wrapper">
    <div className="row z-depth-2">
      <div className="groupTextPanel col s12">
        <h1 className ="groupText center">Group Hub</h1>
      </div>
    </div>
   
      <div className="row toprow">
        <div className="col s3 m3 l3">
          <div className="col s12 top z-depth-2">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="https://cdn.dribbble.com/users/35017/screenshots/1462625/follow_2x.gif"/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Friends<i class="material-icons right"></i></span>
                <p><a href="#">Leaving this link here just in case we need it</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Friends<i class="material-icons right">close</i></span>
                <p>This is where we'll populate our friends</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col s6 m6 l6">
          <div className="col s12 top z-depth-2">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src="https://media.giphy.com/media/3o6gbchrcNIt4Ma8Tu/giphy.gif"/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">Groups<i class="material-icons right"></i></span>
                <p><a href="#">link placeholder</a></p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Groups<i class="material-icons right">close</i></span>
                <p>This is where we'll populate our group</p>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </div>
    <Footer/>
  </div>

     )
    );
  };

};

export default Groups;