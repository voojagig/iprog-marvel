import React, { Component } from 'react';
import './Characters.css';
import Navbar from '../Navbar/Navbar';

class Characters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Comics',

    };

    //this.handleClick = this.handleClick.bind(this);
  }

handleClick = (event)=>{
    console.log("klickat på knappen");

    event.preventDefault();

  }

  render() {

    return (
      <div className="Characters">
      <Navbar/>

      <h3>Characters</h3>
        <button onClick={this.handleClick}>Hämta data</button>
      </div>
    );
  }
}


export default Characters;
