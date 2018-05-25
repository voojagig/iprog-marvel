import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Quiz.css';
//import Navbar from '../Navbar/Navbar';
import Questions from '../Quiz/Questions';

import { modelInstance } from '../data/Model';
import { Link } from 'react-router-dom';
var shuffle = require('shuffle-array');



class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'MarvelQuiz',
        type: '/quiz', 
        results: [],
        name: [],
        status: 'INITIAL',
        alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    };
    this.nextName = this.nextName.bind(this);
  }


  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this)
  }


  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
  }

  handleClick() {
    this.setState({
      status:'LOADING'
    });

    this.startQuiz();

  }
  startQuiz() {
    let alphabet = this.state.alphabet;
    let letters = []
    let heroes = [];
    let nameList = [];

    //shuffle letters in alphabet so 8 random letters fill letter array.
    shuffle(alphabet);
    for (let i = 0; i < 8; i++){
      letters.push(alphabet[i]);
    }

    console.log("Letters: " + letters);
    
    // fetch 4 different characters, one from each letter in [letters]
     for (let i = 0; i < 4; i++){
      let alpha = letters[i];
      modelInstance.getQuizCharacters(alpha).then(Data => {
        let result = Data.data.results.filter((c) => {
          if( c.thumbnail.path !=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") return true
        });

        //push first fetched character w/ pic to heroes. 
        heroes.push(result[0]);
        console.log('heroes: ' + heroes);

        //push first fetched name
        nameList.push(result[0].name);
        
        console.log('namelist: ' + nameList);

        this.setState({
          results: this.state.results.concat([heroes]),
          name: this.state.name.concat([nameList])[0],
          status: 'LOADED',

        });
      }).catch(() => {
        this.setState({
          status: 'ERROR'
        });

      });
    }// slut for loop
    console.log("i state: " + this.state.name)
    
  }
  nextName(names) {
    var array = [...names];// make a separate copy of the array
    array.splice(0,1);
    this.setState({
      name: array,
    });
  }

  render() {

    let quiz = null;
    switch (this.state.status) {
      case 'INITIAL':
      //starting information
        quiz =<div>
          <div className="row">
            <div className="col-xs-2">
            </div>
            <div className="col-xs-8">
              <p>In this quiz you get a name you then have to click on the matching picture. <br/>You can click as many times you want, but the fewer the better. </p>
            </div>   
          </div>
        <div className="row center">
          <Button className="button btn btn-success btn-lg " onClick={ () => this.handleClick()}>Start quiz</Button>
        </div></div>

        break;
    }

    return (
      <div className="container Quiz">
        {/*<Navbar location = {this.state.type}/>*/}

        {quiz}
        <Questions status={this.state.status} results={this.state.results} name={this.state.name} nextName={this.nextName}/>
      
      </div>

    );
  }
}

export default Quiz;
