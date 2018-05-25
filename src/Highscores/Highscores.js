import React, { Component } from 'react';
import './Highscores.css';
import firebase, { auth, provider } from '../firebase';
import firestoreDB from '../data/database';
import ShowHighscore from './ShowHighscore';



class Highscores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      status: 'INITIAL'

    };
    this.getSavedItems = this.getSavedItems.bind(this);
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
      let result = null;

      firestoreDB.getScore().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
      		 result = (doc.data().score); 
        });

      if(result === null){
	      this.setState({
            status: 'EMPTY'
          });
      }
      else{
	      this.setState({
            result: result,
            status: 'LOADED'
          });
      }
      }).catch(() => {
        this.setState({
          status: 'ERROR'
        });

      });
  }
  
  render() {

    return (
      <div className="Highscores">
        <div className="container">
          <div className="row row-eq-height">
          	<h1>Highscore for the quiz</h1>
            <ShowHighscore status={this.state.status} result={this.state.result}/>             
          </div>
        </div>
      </div>
    );
  }
}

export default Highscores;