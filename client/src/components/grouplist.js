import React, { Component } from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js';
import Footer from './footer.js';
import Form from "./form.js";
import io from "socket.io-client";
import axios from "axios";
import $ from "jquery";

class List extends Component {

  state = {
    form: false,
  };

  componentDidMount () {
    
  }

  toggleForm = () => {
    this.state.form ? (this.setState({form:false})):(this.setState({form:true}))
  };

render() { 

  return ( 
  
<div>
        <div className="row toprow">
          <div className="col s2 offset-s5">
            <a className="waves-effect #42a5f5 blue lighten-1 btn" onClick={() => this.toggleForm()}><i className="material-icons left">assignment</i>Add A Group</a>
          </div>
        </div>		
            { this.state.form ? (<Form  click={this.toggleForm}/> ):("") }

        <div className="col s2 m2 l2">
        <div className="col s12 z-depth-2 bordy hoverable">
            <h4>My Groups</h4>
            <hr/>
            
            <ul>
            <li><a className="hovy">group 1</a></li>
            <li><a className="hovy">group 2</a></li>
            <li><a className="hovy">group 3</a></li>
            </ul>
           
         </div>
      </div>
  </div>

     );

  };

};

export default List;