import React, { Component } from 'react';
import './Saved.css';
import firebase, { auth, provider } from '../firebase';
import firestoreDB from '../data/database';


class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comics: null,
      Characters: null,
    };
  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    this.props.model.addObserver(this); 
    this.getSavedItems();    

  }
  

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  getSavedItems(){
    
    let comic = firestoreDB.getSavedComic();
    console.log(comic);
    this.setState({
      Comics: comic.title,
      
    });
    console.log(this.state.Comics);
  }
  render() {

    let knapp = null;
    {this.props.user ? 
      knapp = 
        <h2>Comics: {this.state.Comics}</h2>
      :
      knapp = 
        <h2>Ingenting alls</h2>
    }
    
    return (
      <div className="Saved">
        <div className="container">
          <h1>Your Favourite Heroes</h1>
          {knapp}
        </div>
      </div>
    );
  }
}

export default Saved;