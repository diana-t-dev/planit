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
            <div className="header center">
                <div className='sign'>
                  <h2 className='signHeader'>Sign Up</h2>
                </div>
                
            </div>
            <div className='container'>
              <div className="row">
                <div className="col m6 design">
                  Left design
                </div>
                <div className="col m6 login center">
                  <FacebookLogin
                  appId="397807444004424"
                  autoLoad={false}
                  size="small"
                  fields="name,email,picture"
                  scope="public_profile,user_friends,user_actions.books"
                  icon="fa-facebook-square fa-fw"
                  textButton="Connect with Facebook"
                  callback={this.responseFacebook} />
                </div>
              </div>
            </div>
            <Footer/>
          </div>) )
    }
  }

export default Login;