/* global $ */
import React, { Component } from 'react';
import './Welcome.css';
import { Link } from 'react-router-dom';



class Welcome extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	title: 'MarvelQuiz',
	    	PRIV_KEY: '1a60651bb50c75bb1aa84ede4cdfd872bf409040',
	    	PUBLIC_KEY: '988fc225729038dfd5246cb095fcc5ec',
    	}

  

	}

	handleClick(event) {
		event.preventDefault();
		alert("klickad");
		this.props.model.test();
	}

  
  render() {
    return (
      <div className="Welcome">
        <p>
            Welcome to the MarvelQuiz
        </p>

        <button onClick={this.handleClick}>Klicka här</button>
        
      </div>
    );
  }
}

export default Welcome;
