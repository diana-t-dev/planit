import React, { Component } from "react";
import $ from "jquery";
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
		

		Axios.get("https://api.giphy.com/v1/gifs/search?q=awkward&limit=20&offset=0&rating=G&lang=en&api_key=IelN2EsP53lCGIzF6kjIakIkgXbSa3bL").then
		((data) => {

			console.log(data);

var datas = [];
			
			data.data.data.forEach(i =>{

				datas.push( i.images.downsized_large.url)

				})


			this.setState( {gifs: datas});
			// console.log("data" + JSON.stringify(data.data));
			this.pickGif()
			console.log(this.state.pick);
			


		});
	}

	pickGif = () => {
		if (this.state.gifs !== []){
			
	
				let num = Math.floor(Math.random()*(this.state.gifs).length);
					this.setState({
						pick: this.state.gifs[num]
					})
		}
		
	}

	render() {
		
			console.log(this.state.gifs)
		
		return (

			 cookies.get('name') === undefined ? (<Login />):(

			<div className = "wrapper">
			<div className ="row">
				<div className="col s12 top z-depth-2">
				<h2 className="nomatchText center">Well this is awkward... Innit?</h2>
				</div>
				</div>
				<div className ="row">
				<div className="col s12">
				<div className="panel-list center-align">
					<img src ={this.state.pick}/>
				</div>
				</div>
				
			</div>	
			</div>
			)
		);	
	};




};

export default NoMatch;