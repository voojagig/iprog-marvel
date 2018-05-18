import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './Questions.css';
import { modelInstance } from '../data/Model';
var shuffle = require('shuffle-array');



class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: 'MarvelQuiz',
        type: '/questions', 
        results: '',
        status: 'INITIAL',
        name: null,
       	border: '5px solid black',

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

  question() {
	  let quiz = this.props.results;
	  console.log(this.props.results);
	  this.setState({
	    results: quiz,
	  });

	  var nameList = [];
	  	  	  console.log("i question: " + nameList);

	  for (let i = 0; i < this.state.results.length; i++) {
	    nameList.push(this.state.results[i].name);
	  }

	  shuffle(nameList);

	  for (let i = 0; i < this.state.results.length; i++) {
	   
	  }
	  console.log("i question: " + nameList)
	  this.setState({
	    nameList: nameList
	  });
  }
  handleClick(id) {
  	this.setState({
			border: '5px solid #179f18',
		});
  	if(id.name === this.state.name){
		this.setState({
			border: '5px solid #179f18',
		});
  	}
  }



  render() {
    let quiz = null;
    let counter = null;
    
     switch (this.props.status) {
      case 'LOADING':
        quiz = <em>Loading...</em>
        break;
      case 'LOADED':
      	//this.question('0');

	    //pictures prints, needs to be limited to 8 example.
	    quiz = this.props.results[0].map((character) =>
	    	<div className="col-md-3 col-sm-4" key={character.id}>
	        	<Button onClick={ () => this.handleClick(character.id)}>

	              <img src={character.thumbnail.path + "/portrait_fantastic." + character.thumbnail.extension} style={{border: this.state.border}}alt=""/>

	            </Button>

	        </div>
	    );
        counter = <p>to be a counter</p>; //figured that we need something that shows users counts, can be implemented when the pictures are clickable


          break;
      case 'ERROR':
        quiz = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
        break;
    }

    return (
      <div className="Questions row">
      	<div className="col-xs-3">
        	{counter}
        </div>
        <div className="col-xs-3">
        	{this.state.name}
        </div>
        <div className="row">
        	{quiz}
        </div>

      
      </div>

    );
  }
}

export default Questions;
