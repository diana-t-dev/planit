import React from "react";
import '../App.css';


const Form = props => 
 (
 	<div clasName="wrapper">

 	 <div className="row">

        <div className="col s6 offset-s3 ">

          <div className="card">

            <div className="card-image">

              <img src="https://68.media.tumblr.com/607d816927c95f49d278f04a96c5d421/tumblr_o4utp2WbL81tforevo1_1280.gif"/>


            </div>

            <div className="card-content">

              <div className="row">

   						<form className="col s6 offset-s3">

      

        				<div className="input-field col s12">

         				 <i className="material-icons icon-blue prefix">create</i>

         				 <input id="icon_name" type="text" className="validate" />

         				 <label for="icon_name">What would you like to name your group?</label>

        				</div>
    					 </form>
   						 </div>    
     
   			 <div className="row">

   						<form className="col s6 offset-s3">

       					<div className="input-field col s12">

       					<i className="material-icons icon-blue prefix">face</i>

          				<input id="icon_friend" type="text" className="validate" />

         				 <label for="icon_friend">Add a friend to your group!</label>

       					</div>
       					<div className="center">
       					 <a type="button" className="waves-effect #42a5f5 blue lighten-1 btn" onClick={() => props.click()}>Submit</a>
       					</div> 
     					</form>  
      		</div>
  
  			</div>
 



            </div>

           
          </div>
        </div>
      </div>

	
);

export default Form;

