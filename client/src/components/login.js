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
  	};

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
          cookies.set('id', user.data.usernameId);
          this.setState({loggedin:true})
          console.log("new user was created", user);
          this.props.history.push('/');
        })
      }
      else{
          cookies.set('name',response.name);
          cookies.set('id', response.id);
          
          this.setState({loggedin:true});
          this.props.history.push('/');
      }
      
     })
    
    }

    componentDidMount(){
    	console.log("******",this.props)
    }


    render() {

      

      return (this.state.loggedin === true ? (<Home/>): 

      	(<div className='container'>

         <FacebookLogin
          appId="397807444004424"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook} />     	

      	</div>)  )

    }
  }

export default Login;