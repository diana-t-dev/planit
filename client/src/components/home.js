import React from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js';
import Footer from './footer.js';
import Form from "./form.js";
import io from "socket.io-client";
import axios from "axios";
import ChanForm from "./channelform.js";
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import $ from "jquery";

const cookies = new Cookies();

var socket = io("/");

var room = "general";

const styles = {

	color: "red",
	fontSize: "20px"
}

class Home extends React.Component {

	  state = {
    form: false,
    chat: "",
    all: [],
    channels: [],
    room: 1,
    image: "",
    error: ""
  };

  getImage = () => {
		var id = cookies.get('id')
		axios.get("/image/"+id)
		.then(user => {
			if(user.data[0] !== undefined){
			this.setState({image: user.data[0].image});
			}
		})	
	};

     inputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  };

  chats = (event) => {
  	event.preventDefault();

	console.log("CHAT, ", $(".chatty").val())

  if ($(".chatty").val().trim() !== ""){

  	  socket.emit('SEND_MESSAGE', {
        chat: $(".chatty").val().trim(),
        name: cookies.get('name')
    });

    this.setState({

    	error: ""
    })  

  }

  else{

	this.setState({

		error: "Chat Must Not Be Empty!"
	})
}
};

getChat = () =>{

	let roomy = this.state.room;

	axios.get("/chats/"+roomy).then(data => {

		console.log("got chats");
		console.log(data.data);

	this.setState({

		all: data.data
	})

console.log(this.state.all)
})
};

getChannels = () => {

		let daty = {

	name: "general"
}

axios.get("/channels").then(data => {

		console.log("got channels");
		console.log(data.data);

	this.setState({

		channels: data.data
	})

  $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrainWidth: true, // Does not change width of dropdown to that of the activator
          hover: false, // Activate on hover
          gutter: 0, // Spacing from edge
          belowOrigin: false, // Displays dropdown below the button
          alignment: 'left', // Displays dropdown with edge aligned to the left of button
          stopPropagation: false // Stops event propagation	

});
  
data.data[0] === undefined?(

axios.post("/channel", {daty}).then(data => {

	console.log("general channel set");
	console.log(data);
	this.setState({

		room: data.data.id
	})
	this.getChannels();
})):("")

})
};

goToChan = (chan, name) => {

console.log("CHANNEL ", chan);

this.setState({

	room: chan
})

room = name;

setTimeout(() => { console.log("ROOM", this.state.room), this.getChat(); }, 500);

};


run = () => {

	console.log("CHAT 2, ", $(".chatty").val())

  if ($(".chatty").val().trim() !== ""){

  	this.setState({

  		error: ""
  	})

      const data = {

  name: cookies.get('name'),
  chat: $(".chatty").val().trim(),
  room: this.state.room,
  image: this.state.image
}

axios.post("/chat", data).then( data => {

console.log('chat posted');

this.setState({
  chat: ""
})


})
}

};

 toggleForm = () =>{

  	this.state.form === false ?(

  		this.setState({

  			form:true
  		})):(
		this.setState({

  			form:false
  		})
		
  		)};

componentDidMount(){

	this.getChat();
	this.getChannels();
	this.getImage();

	 socket.on('RECEIVE_MESSAGE', (data) =>{

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

<div className="row">
<div className="col s1">
					 <a className='dropdown-button btn material-icons left mygroups' data-activates='dropdown1'>Channels</a>
					  <ul id='dropdown1' className='dropdown-content'>
					 {this.state.channels.map(i =>{
					 return <li><a type="button" className="goToChan" data-id="username" onClick={() => { this.goToChan(i.id, i.name) }
                    }>{i.name}</a></li> 	

					 })}
                  </ul>
               </div>
               </div>
	<div  className="container">

	<div  className="row">
		<div className="col s12 center">
					<a className="btn" onClick={this.toggleForm}>Add Channel</a>
   {this.state.form ?(
                  	<ChanForm
                  	form={this.toggleForm}
                  	getchan={this.getChannels}/>
                  	):("")}
</div>
</div>

	<div  className="row">

		<div className="col s12 top z-depth-2 bordy4 hoverable">
		<h4 className="chatText">Channel: {room}</h4>
            <hr/>
		<div className="col s12 bordy5">
		<ul>
{ this.state.all !== [] ?( this.state.all.map(i => { return   i.name === cookies.get('name')?
		<li><img className='chatImages' alt={i.name} src={i.image}/><span className='chatwords blue'>{i.name}: {i.text}</span></li>:
		<li><img className='chatImages' alt={i.name} src={i.image}/> <span className='chatwords light-green'>{i.name}: {i.text}</span></li>
		}  )): ("") }
		</ul>
		</div>
		</div>
		<div className="col s12 top z-depth-2 bordy3 hoverable">
		  <h4 className="chatText">Chat <span style={styles}>{this.state.error}</span></h4>
            <hr/>
           <form className="col s12" onSubmit={this.chats} >
                <div className="input-field col s9 ">
                 <i className="material-icons icon-blue prefix">message</i>
                 <input id="icon_name" value={this.state.chat} type="text" className="validate chatty"  name="chat" onChange={this.inputChange} />
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