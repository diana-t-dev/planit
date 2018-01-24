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


    let userId = cookies.get('id');

    axios.get('/mygroups/' + userId).then(result => {

      console.log("got groups");
      console.log(result.data);

      // this.setState({groups: result.data});
      let groups = [];
      for (let i=0; i < result.data.length; i++) {
        axios.get('/groupnames/' + result.data[i]).then(result => {
          console.log(result.data);
          groups.push(result.data);
          this.setState({groups: groups});
          console.log(this.state.groups);    
        })
      }      
    })
  }


  componentDidMount () {

    console.log(this.props)

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

            {this.state.groups !== null && this.state.groups !== undefined ?(

              this.state.groups.map(group =>{

      return <li><a type="button" className="mygroups" data-id="username" onClick={() => this.props.group(group.id)}>{group.name}</a></li>
            
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