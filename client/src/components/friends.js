import React, { Component } from 'react';
import '../App.css';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import $ from "jquery";
import axios from "axios";
import Cookies from 'universal-cookie';
import Login from './login.js';
import Nav from './nav.js';
import Footer from './footer.js';

const cookies = new Cookies();

class Friends extends Component {


  state = {

    users: [],
    friends: ["0"],
    test: [],
    id: ""
  };

  getFriends = () => {

    let userid = cookies.get('id');

    axios.get('/friends/' + userid).then(friend => {
      // console.log('qqqqqqqqqqq',friend.data.data.daty)

      if (friend.data.data.daty===undefined) {
        console.log('undefined')
        this.setState({

          users: friend.data.data.names

        })
      }
      else{
        console.log('not undefined')
        this.setState({

          users: friend.data.data.names,
          friends: friend.data.data.daty

        })        
      }
      // console.log('eeeeeeeee',friend.data.data.daty)

      // this.setState({

      //   users: friend.data.data.names,
      //   friends: friend.data.data.daty

      // })

    })

  };


  getUser = () => {

    let namey = cookies.get('name');

    axios.get('/users/' + namey).then(user => {

      console.log(user);

      user.data && user.data[0] ? (  this.setState({ id: user.data[0].id })) :("")

    })
  };

  addFriend = (i) => {

    let namey = cookies.get('name');
    let friend = i;

    let data = {
      user: namey,
      ids: this.state.id,
      to: friend,
      type: "friend request"
    }

    axios.post('/notification', data)
    .then(friend => {
      console.log(friend);
    })

  };

  delFriend = (i) => {

    let namey = cookies.get('name');
    let friend = i;
    let data = {
      user: namey,
      friend: friend.i
    }

    axios.put('/delfriend', {data})
    .then(friend => {
      
    })

  };

  // test = () => {
  

  // this.state.friends.map(i => {


  // return  (<tr>
  //   <td className="namey">{i}</td>
  //   <td><a href="/friends">{i}'s Groups</a></td>
  //   <td>*</td>
  //   <td><a className="waves-effect waves-light btn delfriend" onClick={() => this.delFriend(i)}>Remove Friend</a></td>
  //   </tr>)

  //   })


  // };


  componentDidMount(){
    this.getFriends();
    this.getUser();


     $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

}

 render() {
   console.log('**************',this.state.friends)

    return (

      cookies.get('name') === undefined ? (<Login {...this.props}/>):

      (<div>
          <Nav/>
          
                <h1 className="center titles groupText">My Friends</h1>
      
            <div className="container">
              <div className="row toprow">
                <div className="col s12">
                  <a className='dropdown-button btn material-icons left add-friend' href='#' data-activates='dropdown1'>Add Friend</a>
                  <ul id='dropdown1' className='dropdown-content'>
                    {
                    this.state.users.map(i => {
                    return <li><a type="button" className="addFriend" data-id="username" onClick={() => { this.addFriend(i) }



                    }>{i}</a></li>
                    })
                    }
                  </ul>
                  <table className="table highlight">
                    <thead>
                      <tr>
                        <th className="friendsText">Name</th>
                        <th className="friendsText">See Friend's Groups</th>
                        <th className="friendsText">Friend Online</th>
                        <th className="friendsText">Friend Online</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.friends[0]==='0'? <p>You have no friends</p>: (this.state.friends.map(i => {
                      return  (<tr>
                        <td className="namey">{i}</td>
                        <td><a href="/friends">{i}'s Groups</a></td>
                        <td>*</td>
                        <td><a className="waves-effect waves-light btn delfriend" onClick={() => this.delFriend(i)}>Remove Friend</a></td>
                        </tr>)} 
                      ) )

}
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Footer/>
          </div>)
        );
      };
};

export default Friends;