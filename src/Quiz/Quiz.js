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
    modelInstance.getQuizCharacters().then(Data => {
      let result = Data.data.results.filter((c) => {
        if( c.thumbnail.path !=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") return true
      });

      //ta ut 8 st random
      let heroes = [];
      console.log(result)
      shuffle(result);

      for (let i = 0; i < 8; i++) {
        console.log(result[i].name)
        heroes.push(result[i]);
      }
      console.log(heroes);

      //gets all the names from the characters in result in a list
      let nameList = [];
      for (let i = 0; i < heroes.length; i++) {
        nameList.push(heroes[i].name);
      }
      //suffles the names
      shuffle(nameList);

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
