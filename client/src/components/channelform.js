import React, { Component } from "react";
import '../App.css';
import $ from "jquery";
import Cookies from 'universal-cookie';
import axios from "axios";
import io from "socket.io-client";

const cookies = new Cookies();

class ChanForm extends Component {

	state = {

		name: ""
	}

	socket = io("/");

     inputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  };

  coms = (event) => {
  	event.preventDefault();
  if (this.state.name !== ""){

  	  this.socket.emit('SEND_MESSAGE', {

        name: this.state.name
    });  
  }
};

run = () => {

  if (this.state.name !== ""){

      const daty = {

  name: this.state.name
}

axios.post("/channel", {daty}).then( data => {

console.log('channel posted');

this.setState({
  name: ""
})

this.props.form();
this.props.getchan();

})
}
};


componentDidMount(){

	 this.socket.on('RECEIVE_MESSAGE', (data) =>{

    this.run();  
});

}
 render() {
 return (
		 <form className="col s12" onSubmit={this.coms} >
                <div className="input-field col s10 ">
                 <i className="material-icons icon-blue prefix">message</i>
                 <input id="icon_name" value={this.state.name} type="text" className="validate"  name="name" onChange={this.inputChange} />
               <label for="icon_name">What's your channel name?</label>
                </div>
                <div className="col s3">
                <a className="btn center #42a5f5 blue lighten-1 " onClick={this.coms}>Enter</a>
                </div>
               </form>

	 )
 }
};

export default ChanForm;

