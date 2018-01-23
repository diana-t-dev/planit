import React, { Component } from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js';
import Footer from './footer.js';
import Form from "./form.js";
import io from "socket.io-client";
import axios from "axios";
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import $ from "jquery";

const cookies = new Cookies();

class List extends Component {

  state = {
    groups: [],
    form: false
  };

    toggleForm = () => {
    this.state.form ? (this.setState({form:false})):(this.setState({form:true}))

  };

  getGroups = () =>{

    let namey = cookies.get('name');

    axios.get(/mygroups/+namey).then(data => {

      console.log("got groups");
      console.log(data);

      this.setState({

        groups: data.data[0].groups
      })

    })
  }

  componentDidMount () {

    this.getGroups();

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
          
        <div className="col s12 m1 l1 small">
        <div className="col s12">
            <a className='dropdown-button btn material-icons left mygroups' data-activates='dropdown1'>My Groups</a>
                  <ul id='dropdown1' className='dropdown-content'>

            {this.state.groups !== null ?(

              this.state.groups.map(i =>{

      return <li><a type="button" className="mygroups" data-id="username" onClick={() => { this.props.setgroup({i}) }}>{i}</a></li>
            
            })
              ):("")}

            </ul>
           
         </div>
      </div>
  </div>

     );

  };

};

export default List;