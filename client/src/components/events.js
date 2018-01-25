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

  componentDidMount() {
    console.log("mounted");

  }

  componentDidUpdate(props) {
    console.log("updated");
    console.log(props);
    // this.renderEvents();
  }

  componentWillReceiveProps(props) {
    this.setState({ group: props.group });
    this.getEvents(props.group);
    // this.renderEvents();
  }

  renderEvents = () => {
    console.log(this.state.events);
    
    let eventsExist = this.state.events && this.state.events !== null;
    if (eventsExist) {
      let eventInfo = this.state.events.map(events => {
        return <div className='eventy'>
          <h5>{events.type}: {events.name} - Posted By: {events.person}</h5>
          <a className="btn #42a5f5 blue lighten-1 " eventid={events.id} for="upvote" onClick={(event) => this.handleVotes(event, events.id)}>Upvote<i class="large material-icons">arrow_upward</i></a><a className="btn #42a5f5 blue lighten-1 " eventid={events.id} for="downvote" onClick={(event) => this.handleVotes(event, events.id)}>Downvote<i class="large material-icons">arrow_downward</i></a>
          <p className="votey">Votes: {events.votes}</p>
          </div>
      })
      return eventInfo;
    }
    else {
      return <h5>No events for this groups yet!</h5>
    }
  }

  getEvents = (group) => {
    // this.setState({
    //   group: group
    // })
    let groupy = group;
    console.log(groupy);
    axios.get("/events/" + groupy).then(data => {
      console.log("&&&&&& " + JSON.stringify(data.data[0]));
      this.setState({
        events: data.data[0].events,
        name: data.data[0].name
      })
    });
  };

  toggleForm = () => {
    this.state.form === false ? (
      this.setState({
        form: true
      })) : (
        this.getEvents(this.props.group),
        this.setState({
          form: false
        })
      )
  };

  // updates votes for selected event
  handleVotes = (event, eventId) => {
    // capture vote type
    let voteType = event.target.getAttribute('for');
    // if the user upvotes, increment current votes by one
    if (voteType === 'upvote') {
      axios.put(`/upvote/${eventId}`)
        .then(results => {
          console.log(results);
          console.log(`incremented votes for event ${eventId}`);
          // re-render event
          this.getEvents(this.state.group);
        })
    }
    // if the user downvotes, decrement current votes by one
    else if (voteType === 'downvote') {
      axios.put(`/downvote/${eventId}`)
        .then(results => {
          console.log(results.data);
          console.log(`decremented votes for event ${eventId}`);
          //re-render event
          this.getEvents(this.state.group);
        })
    }

  }

  render() {

    return (


      <div className="col s8 m7 l7">
        <div className="col s12 top z-depth-2 bordy2 hoverable">
          <h4 className="groupHeader">Group: {this.state.name}</h4>
          <hr />
          <div className="col s10 offset-s1">

            {this.renderEvents()}

          </div>
        </div>
      </div>
    );
  };

};

export default Events;