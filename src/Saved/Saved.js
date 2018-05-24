import React, { Component } from 'react';
import './Saved.css';
import firebase, { auth, provider } from '../firebase';
import firestoreDB from '../data/database';
import SavedCharacters from './SavedCharacters';



class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
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
      let result = [];

      firestoreDB.getSavedCharacter().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data().character);
          result.push(doc.data().character); 
        });
        console.log(result.length);

        if(result.length === 0){
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
      <div className="Saved">
        <div className="container">
          <div className="row row-eq-height">
            <SavedCharacters status={this.state.status} result={this.state.result}/>             
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;