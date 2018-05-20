import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Questions.css';
import { modelInstance } from '../data/Model';


class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'MarvelQuiz',
        status: 'INITIAL',
        border: '5px solid white',
        name: [],
        click: 0,
        quiz: 'ONGOING'

    }
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
    this.setState({
      update: 'yes',
    });
 }

  handleClick (character, event){

    if(character.name === this.props.name[0]){
      event.target.style.border = '5px solid #179f18';
      this.props.nextName(this.props.name);

      if(this.props.name.length === 1){
        this.finishedQuiz();
      }

    }
    else{
      event.target.style.border = '5px solid #d5220f';
      this.setState({
        click: this.state.click + 1,
      });
    }
  }
  finishedQuiz() {
    this.setState({
      quiz: 'FINISHED'
    });
  }



  render() {
    let quiz = null;
    let counter = null;
    let name = null;
      switch (this.state.quiz){
        case 'ONGOING':
          switch (this.props.status) {
          case 'LOADING':
            quiz = <em>Loading...</em>
            break;
          case 'LOADED':
            quiz = this.props.results[0].map((character) =>
            	 <div className="col-md-3 col-sm-4 pic" key={character.id}>
              	<Button onClick={this.handleClick.bind(this, character)}>
                    <img src={character.thumbnail.path + "/portrait_fantastic." + character.thumbnail.extension} className={this.state.class} style={{border: this.state.border}} alt=""/>
                </Button>
             </div>
            );
            name = <p>Click on the character named: <br/> {this.props.name[0]}</p>; //shows the name the user are supose to click on. 

            counter = <p>Number of wrong answers:  {this.state.click}</p>; //shows how many clicks the user mades
          break;
          case 'ERROR':
            quiz = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
          break;
          }
        break;
        case 'FINISHED':
          name = null;
          counter = null;
          quiz = <div> <h1> Congrats! </h1> <p> You finished the quiz with  {(this.state.click !== 0) ? (' only ' + this.state.click + ' wrong answers.') : ' all the answers correct at the first try.'} </p></div>;
        break;
    }
  return (
    <div className="Questions row">
      <div className="col-xs-2"></div>
    	<div className="col-xs-4">
        {name}
      </div>
      <div className="col-xs-4">
        {counter}
      </div>
      <div className="row">
        <div className="col-xs-12">
          {quiz}
        </div>
      </div>

    
    </div>

  );
  }
}

export default Questions;
