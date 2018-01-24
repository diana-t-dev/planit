import React, { Component } from "react";
import '../App.css';
import axios from 'axios';
import CommentCard from './commentcard.js';

class Events extends Component {

  state = {

    group: "",
    name: "",
    events: [],
    form: false
  };

  getEvents = (group) =>{

       this.setState({
      group: group
    })

  let groupy = this.state.group;

console.log(groupy);

    axios.get("events/"+groupy).then(data =>{

console.log(data.data[0]);

this.setState({

    events: data.data[0].events,
    name: data.data[0].name
})

  });

  };

  toggleForm = () =>{

  	this.state.form === false ?(

  		this.setState({

  			form:true
  		})):(
  		this.getEvents(this.props.group),
		this.setState({

  			form:false
  		})
		
  		)};

  componentWillReceiveProps (props) {

    console.log("event props");
    console.log(props.group)
    this.getEvents(props.group);
  }

render() { 

  return ( 

  
        <div className="col s8 m7 l7">
        <div className="col s12 top z-depth-2 bordy2 hoverable">
           <h4 className="groupHeader">Group: {this.state.name}</h4>
           <hr/>
           <div className="col s10 offset-s1">
           
           { this.state.events !== undefined && this.state.events !== null ?(

            this.state.events.map(i =>{
              return <div className="eventy">
          <h5>{i.type}: {i.name} - Posted By: {i.person}</h5>
          <a className="btn">Vote<i class="large material-icons">arrow_upward</i></a><a className="btn">
           Vote<i class="large material-icons">arrow_downward</i></a><a className="btn" onClick={this.toggleForm}><i class="large material-icons">add</i> comment</a>
           {this.state.form === true ?(
           	<CommentCard
           	form={this.toggleForm}
           	id={i.id}
           	/>
           	):("")}
           <p className="votey">Votes: {i.votes}</p>
               <div className="coms">
         { i.comments.map(el =>{
          return<p>{el.user} said: {el.comment}</p>
          })   
        }
          </div>
             </div>
           })
            ):("")}
       		       	
          </div>
          </div>
          </div>
    );
  };

};

export default Events;