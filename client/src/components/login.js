import React from "react";
import '../App.css';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import Home from "./home.js";
const cookies = new Cookies();

  class Login extends React.Component {

  	state={
  		loggedin: false
  	}

  	remove = () =>{
  		cookies.remove('name');
  		console.log('User is', cookies.get('name'))
  		this.setState({loggedin:false})
  		console.log(this.state.loggedin)
  	}


    responseFacebook =(response) => {

      cookies.set('name',response.name);


 		var test = cookies.get('name');

 		console.log('User is', test)

      this.setState({loggedin:true})
      console.log(this.state.loggedin)
    }

    componentDidMount(){
    	
    }


    render() {

      return (this.state.loggedin ===true ? (<Home/>): 

      	(<div className='container'>

      		<button onClick={this.remove}>adfadfa</button>

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