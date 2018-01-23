import React, { Component } from "react";
import Axios from "axios";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();



class NoMatch extends Component {

	state = {
		gifs: [],
		pick: ""
	};

	componentDidMount() {
		
		var key = "api_key=IelN2EsP53lCGIzF6kjIakIkgXbSa3bL";
		Axios.get("https://api.giphy.com/v1/gifs/search?q=awkward&limit=20&offset=0&rating=G&lang=en&"+key)
		.then((data) => {
			var datas = [];
			data.data.data.forEach(i =>{ datas.push( i.images.downsized_large.url)})
			this.setState( {gifs: datas});
			this.pickGif();
		});
	}

	pickGif = () => {
		if (this.state.gifs !== []){
			
			let num = Math.floor(Math.random()*(this.state.gifs).length);
			this.setState({ pick: this.state.gifs[num] })
		}
		
	}

	render() {
		
			console.log(this.state.gifs)
		
		return (

			 cookies.get('name') === undefined ? (<Login {...this.props}/>):(

			<div className = "background404">
			

					<div>
						<p className="center-align text404">Well this is awkward isn't it</p>
					</div>	
					
						<div className="panel-list center-align">
							<img className="gif404" alt='img' src ={this.state.pick}/>
						
				</div>
				
					
			</div>

			
			)
		);	
	}

};

export default NoMatch;