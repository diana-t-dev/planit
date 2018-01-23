import React, { Component } from "react";
import '../App.css';
import axios from 'axios';

class Events extends Component {

  state = {

    group: ""
  }

  getEvents = () =>{

    this.setState({

      group: this.props.group
    })

    let groupy = this.state.group;

    axios.get("events/"+groupy).then(data =>{

console.log(data);
    })
  }

  componentDidMount () {

  }

render() { 

  return ( 

  
        <div className="col s8 m7 l7">
        <div className="col s12 top z-depth-2 bordy2 hoverable">
           <h4>Selected Group Name, Members, Highest Voted Event</h4>
           <hr/>
           <div className="col s10 offset-s1">
           <div className="eventy">
           <p>Event 1 Here - Posted By Here</p>
           <p className="votey">Votes: 0</p>
              <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <a className="btn">Vote<i class="large material-icons">arrow_upward</i></a><a className="btn">
           Vote<i class="large material-icons">arrow_downward</i></a><a className="btn"><i class="large material-icons">add</i> comment</a>
           </div>
           <div className="eventy">   
           <p>Event 2 Here - Posted By Here</p>
           <p className="votey">Votes: 0</p>
           <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <a className="btn">Vote<i class="large material-icons">arrow_upward</i></a><a className="btn">
           Vote<i class="large material-icons">arrow_downward</i></a><a className="btn"><i class="large material-icons">add</i> comment</a>
           </div>
           <div className="eventy">
              <p>Event 3 Here - Posted By Here</p>
              <p className="votey">Votes: 0</p>
              <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <a className="btn">Vote<i class="large material-icons">arrow_upward</i></a><a className="btn">
           Vote<i class="large material-icons">arrow_downward</i></a><a className="btn"><i class="large material-icons">add</i> comment</a>
           </div>

           <div className="eventy">
              <p className="votey">Event 4 Here - Posted By Here</p>
              <p>Votes: 0</p>
              <div className="coms">
           <p> Comment 1...</p>
           <p> Comment 2...</p>
           <p> Comment 3...</p>
           </div>
           <a className="btn">Vote<i class="large material-icons">arrow_upward</i></a><a className="btn">
           Vote<i class="large material-icons">arrow_downward</i></a><a className="btn"><i class="large material-icons">add</i> comment</a>
           </div>

           </div>
          </div>
          </div>

    );
  };

};

export default Events;