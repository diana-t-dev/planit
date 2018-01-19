import React from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js'

const cookies = new Cookies();

class Home extends React.Component {
	

	render(){

	 return (

	 cookies.get('name') === undefined ? (<Login {...this.props}/>):(

		<div>
			<Nav/>
			<div  className="row">
				<div className="col s12 top z-depth-2">
					<h1 className="center">My Dashboard</h1>
				</div>
			</div>
		</div>
		)
	 );
   }
}



export default Home;