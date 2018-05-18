import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Quiz.css';
import Navbar from '../Navbar/Navbar';
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
        status: 'INITIAL',
    };
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
    //this.loadData();
  }

  handleClick() {
    this.setState({
      status:'LOADING'
    });

    this.startQuiz();
    console.log(this.state.results);

  }
  startQuiz() {
    modelInstance.getQuizCharacters().then(Data => {
      let result = Data.data.results.filter((c) => {
        if( c.thumbnail.path !=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") return true
      });

      this.setState({
        results: this.state.results.concat([result]),
        status: 'LOADED',

      });
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });

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
        <Navbar location = {this.state.type}/>
        {quiz}
        <Questions status={this.state.status} results={this.state.results}/>
      
      </div>

    );
  }
}

export default Quiz;
