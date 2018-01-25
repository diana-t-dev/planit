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

  // getUser = () => {
  //   let name = cookies.get('name');
  //   axios.get('/users/' + name).then(user => {
  //     console.log(user);
  //     user.data && user.data[0] ? (this.setState({ id: user.data[0].id })) :("")
  //   }).then(() => {
  //     this.getGroups();
  //   })
  // };

  getGroups = () => {


    // let userId = cookies.get('id');

    axios.get('/mygroups/' + this.state.id).then(results => {

      // set group state equal to the list of group objs
      if (!results.data[0]) {
        this.setState({groups: ['no groups yet']})
      }
      else {
        let groups = results.data;
        this.setState({groups: groups});
        $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: true, // Does not change width of dropdown to that of the activator
          hover: false, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: false, // Displays dropdown below the button
          alignment: 'left', // Displays dropdown with edge aligned to the left of button
          stopPropagation: false // Stops event propagation
        }
      );
      }

    })

  }


  componentDidMount () {

    // console.log(this.props)
    // this.getUser();
    let namey = cookies.get('name');
      axios.get('/users/' + namey).then(user => {
        user.data && user.data[0] ? (this.setState({ id: user.data[0].id })) : ("");
      }).then(results => {
          this.getGroups();
      })
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
            <a className='dropdown-button btn material-icons left mygroups #42a5f5 blue lighten-1 ' data-activates='dropdown1'>My Groups</a>
                  <ul id='dropdown1' className='dropdown-content'>
                  {this.state.groups.map((group) => {
                    if (group === 'no groups yet') {
                      return <li>No groups yet</li>
                    }
                    else {
                      return <li><a type="button" className="mygroups" data-id="username" onClick={() => this.props.group(group.id)}>{group.name}</a></li>
                    }
                  })}
            </ul>
           
         </div>
      </div>
  </div>

     );

  };

};

export default List;