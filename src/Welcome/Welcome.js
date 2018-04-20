import React, { Component } from 'react';
import './Welcome.css';
import Navbar from '../Navbar/Navbar';

import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
      <Navbar>
        <p>
            Welcome to the dinner planner React Startup code!
        </p>
        
        <Link to="/search">
            <button>Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
