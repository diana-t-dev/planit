import React from "react";
import './login.css';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import Home from "./home.js";
import axios from "axios";
import Footer from './footer.js';
const cookies = new Cookies();

  class Login extends React.Component {

	state={
		loggedin: false
	};

  responseFacebook = (response) => {

    var id = response.id
    axios.get('/user/' + id)
      .then(user => {

        if (user.data === null) {

          var newUser = {
            usernameId: response.id,
            username: response.name,
            image: response.picture.data.url
          }

          axios.post('/newUser', { newUser })
            .then(user => {
                cookies.set('name', user.data.username);
                cookies.set('id', user.data.usernameId);
                this.setState({loggedin: true})
                this.props.history.push('/');
            })
        } 
        else {
            cookies.set('name', response.name);
            cookies.set('id', response.id);
            this.setState({ loggedin: true });
            this.props.history.push('/');
        }
      })
  }

    componentDidMount(){
    }


    render() {

      

      return (this.state.loggedin === true ? (<Home/>): 

      	(<div>
            <div className="header">
                <div className='sign'>
                  <h3 className='signHeader'>Fun with Friends</h3>
                </div>
                
            </div>
            <div className='container'>

              <div className="row">
                <div className="col s12 main center test">
                  <div className='login blue lighten-3'>
                    <div className='button col m12 s12'>
                        <FacebookLogin
                        appId="397807444004424"
                        autoLoad={false}
                        size="small"
                        fields="name,email,picture"
                        scope="public_profile,user_friends,user_actions.books"
                        icon="fa-facebook-square fa-fw"
                        textButton="Login with Facebook"
                        callback={this.responseFacebook} />
                    </div>                   
                  </div>
                  <div className='content'>
                      <p>Images will go here</p>
                  </div>
                </div>
              </div>
           
            </div>
            <Footer/>
          </div>) )
    }
  }

export default Login;