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
    form: false,
    id: ""
  };

  toggleForm = () => {
    this.state.form ? (this.setState({form:false})):(this.setState({form:true}))

  };

  getUser = () => {
    let name = cookies.get('name');
    axios.get('/users/' + name).then(user => {
      console.log(user);
      user.data && user.data[0] ? (this.setState({ id: user.data[0].id })) :("")
    }).then(() => {
      this.getGroups();
    })
  };

  getGroups = () =>{


    // let userId = cookies.get('id');

    axios.get('/mygroups/' + this.state.id).then(result => {

      console.log("got groups");
      console.log(result.data);

      // set group state equal to the list of group objs
      this.setState({groups: result.data});

    })
  }


  componentDidMount () {

    console.log(this.props)
    this.getUser();

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