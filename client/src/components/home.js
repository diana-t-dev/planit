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

  toggleForm = () => {

    this.state.form ?(

      this.setState({form:false})

      ):
    (

    this.setState({form:true})
)
  };

     inputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  };

  chats = () => {

  if (this.state.chat !== ""){

  	  this.socket.emit('SEND_MESSAGE', {

        chat: this.state.chat,
        name: cookies.get('name')
    });  

  }
	
};

run = () => {

  if (this.state.chat !== ""){

      const data = {

  name: cookies.get('name'),
  chat: this.state.chat
}

axios.post("/chat", data).then( data => {

console.log('chat posted');
 

})
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

componentDidMount(){

	this.getChat();

	 this.socket.on('RECEIVE_MESSAGE', (data) =>{

    this.run();
   this.getChat();

});

}
	render(){

	 return (

	 cookies.get('name') === undefined ? (<Login {...this.props}/>):(

		<div>
			<Nav/>
			<div  className="row">
				<div className="col s12 top z-depth-2">
					<h1 className="center">My Dashboard</h1>
				</div>
				</div>
   <div className="row toprow">
      <div className="col s2 offset-s5">
        <a className="waves-effect #42a5f5 blue lighten-1 btn" onClick={() => this.toggleForm()}><i className="material-icons left">assignment</i>Add A Group</a>
      </div>
    </div>		
				{ this.state.form ? (<Form  click={this.toggleForm}/> ):("") }

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
           <form className="col s12">
                <div className="input-field col s9 ">
                 <i className="material-icons icon-blue prefix">message</i>
                 <input id="icon_name" type="text" className="validate"  name="chat" onChange={this.inputChange} />
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