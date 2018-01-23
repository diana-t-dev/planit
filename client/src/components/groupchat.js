import React, { Component } from "react";
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Chat extends Component {

  state = {

    thing: "",
    location: "",
    results: [],
    results2: [],
    results3: []

  };

   inputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

  };

  search = () => {

    let url = "https://api.foursquare.com/v2/venues/search?&query=" + this.state.thing + "&mode=url&limit=5&near=" + this.state.location + "%2C%20CA%2C%20United%20States&client_id=YDAI3HM532ZHCLP4XBC4Z5OCOO2YN5JT3Q3SP4C3EKDNZKT5&client_secret=UQKRY5R4YPYKDQAQNUCVSSVGGPMUXPQA1XSIJOIQT5ZDO4HU&v=20140806&m=foursquare";

    axios.get(url).then(data => {

    console.log(data.data.response.venues);

    this.setState({

      results: data.data.response.venues,
      results2: [],
      results3: []
    })

    console.log(this.state.results);


    })
  };

searchevent = () => {

    let url = "https://www.eventbriteapi.com/v3/events/search/?q="+this.state.thing+"&sort_by=best&location.address="+this.state.location+"&token=ZHYMXVXF44JLXPWWBSYQ";

    axios.get(url).then(data => {

    console.log(data.data.events);

    for (var i = 0; i < 5; i++) {

      this.setState({

      results2: [...this.state.results2, data.data.events[i]],
      results: [],
      results3: []
    })
     
    }

    console.log(this.state.results2);

    })
  };

  searchmovie = () => {

 let BASEURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=c0f1c321f80530f1c8b9eeee2923c0f5&page=1";

  axios.get(BASEURL).then(data =>{

    console.log(data.data.results);


  for (var i = 0; i < 10; i++) {

      this.setState({

      results3: [...this.state.results3, data.data.results[i]],
      results: [],
      results2: []
    })
     
    }

    console.log(this.state.results3);


    })
  };


  add = (name, type) => {

    let person = cookies.get('name');

  let data = {

      name: name,
      type: type,
      person: person
    
    }

    axios.post('/addevent', {data}).then(data =>{

      console.log('event added')

    })

  }

  componentDidMount () {

  }

render() { 

  return ( 

        <div className="col s6 m4 l4">
          <div className="col s12 top z-depth-2 bordy hoverable">
           <h4>Search</h4>
            <hr/>
           <form className="col s12">
                <div className="input-field col s12">
                 <i className="material-icons icon-blue prefix">search</i>
                 <input id="icon_name" type="text" name="thing" className="validate" onChange={this.inputChange} />
               <label for="icon_name">What do you want to do?</label>
               </div>
               </form>
               <form>
               <div className="input-field col s12">
                <i className="material-icons icon-blue prefix">location_on</i>
               <input id="icon_location" type="text" name="location" className="validate" onChange={this.inputChange} />
               <label for="icon_location">where are you searching?</label>
                </div>
               </form>

               <a className="btn" onClick={this.search}>Places</a>
               <a className="btn" onClick={this.searchevent}>Events</a>
               <a className="btn" onClick={this.searchmovie}>Movies</a>
          <h4>Results</h4>
          <hr/>
            <ul>
            {
              this.state.results !== undefined ?(


              this.state.results.map(i => 

                <div>
              <li className="hovy">{i.name}</li>
               <li className="hovy">{i.location.address}</li>

               {i.categories[0] !== undefined ?(
               <li className="hovy">{i.categories[0].name}</li>):("")}
              <a className="btn" onClick={() =>this.add(i.name, "Place")}>Add to Group</a>
               </div>

           ) ):("")

              }

              {
              this.state.results2 !== undefined ?(


              this.state.results2.map(i => 

                <div>
             <li className="hovy">{i.name.text}</li>
              <li className="hovy">Date: {i.start.local}</li>
              <li className="hovy"><a href={i.url} target="_blank">Link to Event</a></li>
              <a className="btn" onClick={() =>this.add(i.name.text, "Event")}>Add to Group</a>
               </div>

           ) ):("")

              }

         {
              this.state.results3 !== undefined ?(


              this.state.results3.map(i => 

                <div>
             <li className="hovy">{i.original_title}</li>
              <li className="hovy">Rating: {i.vote_average}</li>
            <li className="hovy">Plot: {i.overview}</li>
              <a className="btn" onClick={() =>this.add(i.original_title, "Movie")}>Add to Group</a>
               </div>

           ) ):("")

              }
            
            

            </ul>
          </div>
      </div>
    );
  };

};

export default Chat;