import React from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js';
import Footer from './footer.js';
import Form from "./form.js";
import io from "socket.io-client";
import axios from "axios";

const cookies = new Cookies();

class Home extends React.Component {

	  state = {
    form: false,
    chat: "",
    all: []
  };

 socket = io("/");

     inputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  };

  chats = (event) => {
  	event.preventDefault();
  if (this.state.chat !== ""){

  	  this.socket.emit('SEND_MESSAGE', {

        chat: this.state.chat,
        name: cookies.get('name')


    });  

console.log();	

  }


};

getChat = () =>{

	axios.get("/chats").then(data => {

		console.log("got chats");
		console.log(data.data);

	this.setState({

		all: data.data
	})

console.log(this.state.all)
})
};

run = () => {

  if (this.state.chat !== ""){

      const data = {

  name: cookies.get('name'),
  chat: this.state.chat
}

axios.post("/chat", data).then( data => {

console.log('chat posted');

this.setState({
  chat: ""
})


})
}
};


componentDidMount(){

	this.getChat();

	 this.socket.on('RECEIVE_MESSAGE', (data) =>{

    this.run();

    setTimeout(() => { this.getChat(); }, 200);
     
});

}
	render(){

	 return (

	 cookies.get('name') === undefined ? (<Login {...this.props}/>):(

		<div>
			<Nav/>
		
					<h1 className="center titles groupText">My Dashboard</h1>

	<div  className="container">
	<div  className="row">
		<div className="col s12 top z-depth-2 bordy4 hoverable">
		<ul>
		{ this.state.all !== [] ?(

			this.state.all.map(i => {

				return <li>{i.name} says: {i.text}</li>
			})

			): ("")
		}
		</ul>
		</div>

		<div className="col s12 top z-depth-2 bordy3 hoverable">
		  <h4>Chat</h4>
            <hr/>
           <form className="col s12" onSubmit={this.chats} >
                <div className="input-field col s9 ">
                 <i className="material-icons icon-blue prefix">message</i>
                 <input id="icon_name" value={this.state.chat} type="text" className="validate"  name="chat" onChange={this.inputChange} />
               <label for="icon_name">What's on your mind'?</label>
                </div>
                <div className="col s3">
                <a className="btn center" onClick={this.chats}>Enter</a>
                </div>
               </form>


		</div>

		</div>
		</div>
			
			<Footer/>
		</div>
		)
	 );
   }
}



export default Home;