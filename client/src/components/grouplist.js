import React, { Component } from "react";
import '../App.css';

class List extends Component {

  componentDidMount () {

  }

render() { 

  return ( 
  
<div>
        <div className="col s2 m2 l2">
        <div className="col s12 z-depth-2 bordy hoverable">
            <h4>My Groups</h4>
            <hr/>
            
            <ul>
            <li><a className="hovy">group 1</a></li>
            <li><a className="hovy">group 2</a></li>
            <li><a className="hovy">group 3</a></li>
            </ul>
           
         </div>
      </div>
  </div>

     );

  };

};

export default List;