import React, { Component } from 'react';
import './Comics.css';
import Navbar from '../Navbar/Navbar';

class Comics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: 'Comics',

    };
    //this.handleClick = this.handleClick.bind(this);

  }

  handleClick = (event)=>{
    this.props.model.fetchComics().then(function(data){
      this.setState({
        status: 'LOADED',
        Comics: data.data.results
      });
    }.bind(this));
    console.log("Fetched data from API: " + this.state.Comics);


    console.log(this.state.status);

    event.preventDefault();
  }

  render() {

    return (
      <div className="Comics">
        <Navbar/>
      <h3>Comics</h3>
        <button onClick={this.handleClick}>Hämta data</button>
      </div>
    );
  }
}


export default Comics;
