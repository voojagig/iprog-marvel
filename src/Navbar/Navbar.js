import React, { Component } from 'react';
import './Navbar.css';
import { Link, nav} from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
    	<nav className="navbar navbar-default navbar-static-top">
 			<div className="container-fluid">
	 			<div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand " href="/">Marvel</a> {/* should be the header */}
			    </div>

			    <div className="collapse navbar-collapse" id="bss-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
			        <li><a href="/comics">Comics</a></li>
			        <li><a href="/characters">Characters</a></li>
			        <li><a href="#">Quiz</a></li>
			      </ul>
			    
			      <ul className="nav navbar-nav navbar-right">
			        <form className="navbar-form navbar-left">
			        	<div className="form-group">
			          		<input type="text" className="form-control" placeholder="Search for comics or characters"/>
			        	</div>
			        	<button type="submit" className="btn btn-default">Search</button>
			      	</form>
			        <li className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Register<span className="caret"></span></a>
			          <ul className="dropdown-menu">
			            <li><a href="#">Log in/Register</a></li>
			            <li><a href="#">Highscore</a></li>
			            <li><a href="#">Saved characters</a></li>
			            <li role="separator" className="divider"></li>
			            <li><a href="#">Log out</a></li>
			          </ul>
			        </li>
			      </ul>
			    </div>


  			</div>
		</nav>
      </div>
    );
  }
}

export default Navbar;
