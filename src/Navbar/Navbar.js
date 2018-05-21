import React, { Component } from 'react';
import './Navbar.css';
import { nav} from 'react-router-dom';
import { modelInstance } from '../data/Model'

class Navbar extends Component {
	constructor(props) {
		super(props)
	    this.state = {
	      status: 'INITIAL',
	      user: this.props.user

	    };

  	}

  	componentDidUpdate() {
	}


  render() {

  	let knapp = null;

  	{this.props.user ? 

  		//console.log(this.state.user)
  		knapp = 
  			<a onClick={this.props.toLogout} >Log out</a>  		
  		:
  		knapp = 
  			<a onClick={this.props.toLogin} >Log in</a>	
  	}

    return (
    	<nav className="navbar navbar-default navbar-fixed-top">
 			<div id="myNavbar" className="container-fluid">
	 			<div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <div className="navbar-brand">MARVEL</div> {/*the header */}
			    </div>

			    <div className="collapse navbar-collapse" id="navbar-collapse-1">
			      <ul className="nav navbar-nav">
			      	<li className={(this.props.location === '/') ? 'active' : ''}><a href="/">Home</a></li>
			        <li className={(this.props.location === '/comics') ? 'active' : '' }><a href="/comics">Comics</a></li>
			        <li className={(this.props.location === '/characters') ? 'active' : ''}><a href="/characters">Characters</a></li>
			        <li className={(this.props.location === '/quiz') ? 'active' : ''}><a href="/Quiz">Quiz</a></li>
			      </ul>
			    
			      <ul className="nav navbar-nav navbar-right">
			        
			        {/* Ta bort om vi inte hinner implementera search
				        <form className="navbar-form navbar-left">
			        	<div className="form-group">
			          		<input type="text" className="form-control" placeholder="Search for comics or characters"/>
			        	</div>
			        	<button type="submit" className="btn btn-default">Search</button>
			      	</form>*/}
			        <li className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account<span className="caret"></span></a>
			          <ul className="dropdown-menu">
			           <li>
				   		{knapp}
			           </li>
			           			            
			            <li><a href="/register">Register</a></li>
			            <li><a href="#">Highscore</a></li>
			            <li><a href="#">Saved characters</a></li>
			            <li role="separator" className="divider"></li>
			          </ul>
			        </li>
			      </ul>
			    </div>
  			</div>
		</nav>
    );
  }
}

export default Navbar;
