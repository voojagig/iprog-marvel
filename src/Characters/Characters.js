import React, { Component } from 'react';
import './Characters.css';

class Characters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // filter: '',
      // type: '',
      // dishes: '',
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event){
    alert("klickat på knappen");

    // modelInstance.getMarvelResponse();

    // this.setState({
    //   Uppdate: 'yes'
    // });

    event.preventDefault();
    //this.fetchDishes()

  }

  


  render() {
    //const searchTerm = this.state.type + '&query=' + this.state.filter;

    return (
      <div className="Characters">
      <h3>Characters</h3>
        <button onClick={this.handleClick}>Hämta data</button>
      </div>
    );
  }
}


export default Characters;
