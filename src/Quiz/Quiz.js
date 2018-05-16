import React, { Component } from 'react';
import './Quiz.css';
import Navbar from '../Navbar/Navbar';

import { Link } from 'react-router-dom';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'MarvelQuiz',
        type: '/quiz'


    };

  }
  render() {
    return (
      <div className="Welcome">
      <Navbar location = {this.state.type}/>
<p>det här är quiz </p>
      </div>
    );
  }
}

export default Quiz;
