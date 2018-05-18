import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Quiz.css';
import Navbar from '../Navbar/Navbar';
import { modelInstance } from '../data/Model';
import { Link } from 'react-router-dom';
var shuffle = require('shuffle-array');



class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'MarvelQuiz',
        type: '/quiz', 
        results: '',
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
  }
  startQuiz() {
    modelInstance.getQuizCharacters().then(Data => {
      const result = Data.data.results.filter((c) => {
        if( c.thumbnail.path !=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") return true
      });
      this.setState({
        status: 'LOADED',
        results: result,
      });

      var nameList = [];
      for (let i = 0; i < this.state.results.length; i++) {
        nameList.push(this.state.results[i].name);
      }
      shuffle(nameList);

      for (let i = 0; i < this.state.results.length; i++) {
        console.log("namn: " + nameList[i]);
      }

      this.setState({
        name: nameList
      });

    }).catch(() => {
    this.setState({
      status: 'ERROR'
    });

    });
    
  }




  render() {
    let quiz = null;
    var nameList =[];
    let counter = null;
    

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
      case 'LOADING':
        quiz = <em>Loading...</em>
        break;
      case 'LOADED':
          //pictures prints, needs to be limited to 8 example. 
          quiz = this.state.results.map((character) =>
            <div className="col-md-3 col-sm-4" key={character.id}>

                <Button>

                <div className="">
                  <img src={character.thumbnail.path + "/portrait_fantastic." + character.thumbnail.extension} alt=""/>
                </div>

                </Button>

            </div>
          );
          counter = <p>to be a counter</p>; //figured that we need something that shows users counts, can be implemented when the pictures are clickable


          break;
      default:
        quiz = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
        break;
    }

    return (
      <div className="container Quiz">
        <Navbar location = {this.state.type}/>
        {counter}
        {quiz}

      
      </div>

    );
  }
}

export default Quiz;
