import React from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';
import Nav from './nav.js';
import Footer from './footer.js';
import Form from "./form.js";

const cookies = new Cookies();

class Home extends React.Component {

	  state = {
    form: false
  }

  toggleForm = () => {

    this.state.form ?(

      this.setState({form:false})

      ):
    (

    this.setState({form:true})
)
  }
	

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
   <div className="row toprow">
      <div className="col s2 offset-s5">
        <a className="waves-effect #42a5f5 blue lighten-1 btn" onClick={() => this.toggleForm()}><i className="material-icons left">assignment</i>Add A Group</a>
      </div>
    </div>		
				{ this.state.form ? (<Form  click={this.toggleForm}/> ):("") }
			
			<Footer/>
		</div>
		)
	 );
   }
}



export default Home;