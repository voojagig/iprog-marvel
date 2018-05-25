import React, { Component } from 'react';
import './Navbar.css';
import { nav, NavLink} from 'react-router-dom';



class Navbar extends Component {
	constructor(props) {
		super(props)
	    this.state = {
	      status: 'INITIAL',
	      user: this.props.user,
	      

	 	}	
	 	this.handleLocation = this.handleLocation.bind(this);
	}
  	handleLocation (loc, e) {
  		e.stopPropagation();
  		let location = loc;
  		alert(location);
	  	this.setState({
	  		location: location,
	  	});
	  	alert(this.state.location)
  	}
  	render() {
	  	let knapp = null;

	  	{this.props.user ? 

	  		
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
			      	<li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
			        <li><NavLink to="/comics" activeClassName="active">Comics</NavLink></li>
			        <li><NavLink to="/characters" activeClassName="active">Characters</NavLink></li>
			        <li><NavLink to="/Quiz" activeClassName="active">Quiz</NavLink></li>
			      </ul>
			    
			      <ul className="nav navbar-nav navbar-right">
			        
			        <li className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account<span className="caret"></span></a>
			          <ul className="dropdown-menu">
			           
			           	{/*only show higscore and saved characters option when user is logged in. */}
			            <li hidden={(this.props.user === null) ? true : false}><NavLink to="#"activeclassname="active">Highscore</NavLink></li>
			            <li hidden={(this.props.user === null) ? true : false}><NavLink to="/saved" activeclassname="active">Saved characters</NavLink></li>
			            <li role="separator" className="divider"></li>
			            <li>
				   		{knapp}
			           </li>
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
