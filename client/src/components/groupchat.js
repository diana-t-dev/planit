import React, { Component } from "react";
import '../App.css';

class Chat extends Component {

  componentDidMount () {

  }

render() { 

  return ( 

        <div className="col s3 m3 l3">
          <div className="col s12 top z-depth-2 bordy hoverable">
           <h4>Search</h4>
            <hr/>
           <form className="col s12">
                <div className="input-field col s12">
                 <i className="material-icons icon-blue prefix">search</i>
                 <input id="icon_name" type="text" className="validate" />
               <label for="icon_name">What do you want to do?</label>
                </div>
               </form>

               <a className="btn">Search</a>
          <h4>Results</h4>
          <hr/>
            <ul>
            <li><a className="hovy">result 1 - Add to Group Events</a></li>
            <li><a className="hovy">result 2 - Add to Group Events</a></li>
            <li><a className="hovy">result 3 - Add to Group Events</a></li>
            </ul>
          </div>
      </div>
    );
  };

};

export default Chat;