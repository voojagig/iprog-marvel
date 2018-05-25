import React, { Component } from 'react';
import './Highscores.css';



class ShowHighscore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let Highscore = null;

    switch(this.props.status){
      case 'INITIAL': 
          Highscore = <p>Highscore is loading...</p>
      break;
      case 'LOADED': 
          
         Highscore = 
         	<div className="caption">
            	<h3 className="highscore"> Your highscore are: {this.props.result} wrong clicks in one quiz!</h3>
            </div>
            
      break;
      default:
        Highscore = <p>You do not have a highscore yet!</p>
    }
    return (
	    <div className="ShowHighscore" key="ShowHighscore">
          <div className="container-fluid">
          	{Highscore}
          </div>
       	</div>
	);
  }
}

export default ShowHighscore;