import React, { Component } from "react";
import axios from "axios";
import '../App.css';
import Cookies from 'universal-cookie';
import { GoogleLogin } from 'react-google-login';



const cookies = new Cookies();
	

class Logout extends Component {

	state = {
		loggedin: false,
		gifs: [],
		pick: ""
	}

	update = () => {
		var id = cookies.get('id');
		axios.put("/logout/"+id)

	}	

	responseGoogle = (response) => {

    var id_token = response.getAuthResponse().id_token;
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
    .then( googleUser => this.validate(googleUser.data) )

	};

     validate = (response) => {
    console.log('***********',response.sub)
    console.log('11111111111',response.name)
    console.log('@@@@@@@@@@@',response.picture)

    var id = response.sub
    axios.get('/user/' + id)
      .then(user => {

        if (user.data === null) {

          var newUser = {
            usernameId: response.sub,
            username: response.name,
            image: response.picture
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
            cookies.set('id', response.sub);
            this.setState({ loggedin: true });
            this.props.history.push('/');
        }
      })
  }


  
 



	componentDidMount() {
		this.update()

		var key = "api_key=IelN2EsP53lCGIzF6kjIakIkgXbSa3bL"
		axios.get("https://api.giphy.com/v1/gifs/search?q=crying&limit=20&offset=0&rating=G&lang=en&"+key)
			.then((data) => {

				cookies.remove('name');
				cookies.remove('id');

				var datas = [];

				data.data.data.forEach(i => { datas.push(i.images.downsized_large.url)})
				this.setState({ gifs: datas });
				this.pickGif()
			});
	}

	pickGif = () => {
		if (this.state.gifs !== []){
			let num = Math.floor(Math.random()*(this.state.gifs).length);
			this.setState({ pick: this.state.gifs[num]})
		}
	}

	render() {

		return (

			<div className="backgroundLogout">
			
					
					
						<div>
							<p className="center logoutText">Why do you have to leave? Everyone always leaves...</p>
						</div>

						<div>
							<p className="logoutSecondaryText center">please comeback...</p>
						</div>
						<div>
							
                               <div className="center loginButton2">
                                    <GoogleLogin
                                      clientId="1057993298286-11clhhie8id2del793p0usgcb1vh3spu.apps.googleusercontent.com"
                                      buttonText="Login with Google"
                                      onSuccess={this.responseGoogle}
                                      onFailure={this.responseGoogle}
                                      icon="fa fa-google"
                                    />
                                </div>             
                           	

						</div>	
					
					
						<div className = "panel-list center-align">
								<img className="logoutGif" alt='img' src ={this.state.pick}/>
						</div>
				</div>
					
		);
	};
};


export default Logout;