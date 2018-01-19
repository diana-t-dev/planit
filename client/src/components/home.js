import React from "react";
import '../App.css';
import Login from './login.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Home = props => (

 cookies.get('name') === undefined ? (<Login />):(

    <div className="row">
<div className="col s12 top z-depth-2">
<h1 className="center">My Dashboard</h1>
</div>
</div>

)
);

export default Home;