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

      	(
              <div className="backgroundy">

                  <div className="container">
                    <div className="row loginRow">
                        <div className="col s12 m8 l8">
                          <div className="loginCard card blue-grey darken-1">
                            <div className="loginContent card-content white-text">
                             
       
                               <div className="center loginButton">
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
                            
                          </div>
                        </div>
                      </div>

                      <div className="descriptionRow center row">
                        <div className=" col s4 m4 l4">
                          <div className="descriptionBorder">
                          <img className="descriptGif" src="https://media.giphy.com/media/ZnbIrqkXGKfgk/giphy.gif"/>
                          <p className="descriptText"> description placeholder</p>
                          </div>
                        </div>
                        <div className=" col s4 m4 l4">
                          <div className="descriptionBorder">
                          <img className="descriptGif" src="https://media.giphy.com/media/ZnbIrqkXGKfgk/giphy.gif"/>
                          <p className="descriptText"> description placeholder</p>
                          </div>
                        </div>
                        <div className=" col s4 m4 l4">
                          <div className="descriptionBorder">
                          <img className="descriptGif" src="https://media.giphy.com/media/ZnbIrqkXGKfgk/giphy.gif"/>
                          <p className="descriptText"> description placeholder </p>
                          </div>
                        </div>
                       </div> 
                              
                     </div> 
                   </div>  

         ) )

    }
  }

export default Login;