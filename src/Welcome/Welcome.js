import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <p>
            Welcome to the dinner planner React Startup code!
        </p>
        
        <Link to="/comics">
            <button>Show Comics</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
