import React, { Component } from "react";
import '../App.css';
import $ from "jquery";
import Cookies from 'universal-cookie';
import axios from "axios";
import io from "socket.io-client";

const cookies = new Cookies();

class CommentCard extends Component {

	state = {

		comment: "",
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
  if (this.state.comment !== ""){

  	  this.socket.emit('SEND_MESSAGE', {

        comment: this.state.comment,
        name: cookies.get('name')

    });  
  }
};

run = () => {

  if (this.state.comments !== ""){

      const data = {

  name: cookies.get('name'),
  comment: this.state.comment,
  eventId: this.props.id
}

axios.post("/comment", {data}).then( data => {


this.setState({
  comment: ""
})

})
}
};


componentDidMount(){

	 this.socket.on('RECEIVE_MESSAGE', (data) =>{

    this.run();

    setTimeout(() => { this.props.form();}, 200);
     
});

}
 render() {
 return (
		 <form className="col s12" onSubmit={this.coms} >
                <div className="input-field col s9 ">
                 <i className="material-icons icon-blue prefix">message</i>
                 <input id="icon_name" value={this.state.comment} type="text" className="validate"  name="comment" onChange={this.inputChange} />
               <label for="icon_name">What's on your mind?</label>
                </div>
                <div className="col s3">
                <a className="btn center #42a5f5 blue lighten-1 " onClick={this.coms}>Enter</a>
                </div>
               </form>

	 )
 }
};

export default CommentCard;

