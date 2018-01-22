import React, { Component } from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js';
import Footer from './footer.js';
import List from './grouplist.js';
import Chat from './groupchat.js';
import Events from './events.js';


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
    
        <h1 className ="groupText center titles">Group Hub</h1>
   
   
        <div className="row toprow">
          <div className="col s12 top borders">
          <List />
          <Events />
          <Chat />
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