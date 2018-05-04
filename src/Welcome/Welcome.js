import React, { Component } from 'react';
import './Welcome.css';
import Navbar from '../Navbar/Navbar';

import { Link } from 'react-router-dom';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'MarvelQuiz',
        type: '/'


    };

  }
  render() {
    return (
      <div className="Welcome">
      <Navbar location = {this.state.type}/>
        <p>
            Welcome to our Marvel Quiz, to the right you can log in or create an account to save your progress in the game. An registered user can also save their favorite characters. 
            In the menu above you can start a quiz or browse between Marvels comics and characters to find fun info about them. Enjoy! 
        </p>
      </div>
    );
  }
}

export default Welcome;
