import React from "react";
import '../App.css';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import Home from "./home.js";
import axios from "axios";
const cookies = new Cookies();

  class Login extends React.Component {

  	state={
  		loggedin: false
  	}

    responseFacebook =(response) => {

    var id = response.id
    console.log(response.id);
    console.log(response.name);
    console.log(response.picture.data.url);

    axios.get('/user/'+id)
    .then( user => {

      if (user.data === null) {

        var newUser = {
          usernameId: response.id,
          username: response.name,
          image: response.picture.data.url
        }

        axios.post('/newUser', {newUser})
        .then( user => {
          cookies.set('name',user.data.username);
          this.setState({loggedin:true})
          console.log("new user was created", user)
        })
      }
      else{
          cookies.set('name',response.name);
          this.setState({loggedin:true});
      }
      


    })
    

    
   //  console.log(response);

 		// var test = cookies.get('name');

 		// console.log('User is', test)

   //    this.setState({loggedin:true})
   //    console.log(this.state.loggedin)
    }

    componentDidMount(){
    	
    }


    render() {

      return (this.state.loggedin ===true ? (<Home/>): 

      	(<div className='container'>

         <FacebookLogin
          appId="397807444004424"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook} />     	

      	</div>)  )

    }
  }

export default Login;