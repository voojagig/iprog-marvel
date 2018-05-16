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

  loadData(){
        modelInstance.getCharacters().then(Data => {
          const result = Data.data.results.filter((c) => {
            if( c.thumbnail.path !=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") return true
          });
          this.setState({
            status: 'LOADED',
            results: result,
          });
          // console.log("id: " + this.state.results[0].id);
          // console.log(this.state.status)

          var nameList = [];
          for (let i = 0; i < this.state.results.length; i++) {
            nameList.push(this.state.results[i].name);
          }
          shuffle(nameList);

          for (let i = 0; i < this.state.results.length; i++) {
            console.log("namn: " + nameList[i]);
          }

          this.setState({name: nameList});
          // console.log(nameList);
          //console.log("state: " + this.state.name[0]);

        }).catch(() => {
          this.setState({
            status: 'ERROR'
          });

        });


  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this)
    this.loadData();

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




  render() {
    let charactersList = null
    var nameList =[];
    

     switch (this.state.status) {
      case 'INITIAL':
        charactersList = <em>Choose a letter to see comics</em>
        break;
      case 'LOADING':
        charactersList = <em>Loading...</em>
        break;
      case 'LOADED':
        
          charactersList = this.state.results.map((comic) =>
                <div className="col-md-3 col-sm-4" key={comic.id}>

                    <Button>

                    <div className="thumb">
                      <img src={comic.thumbnail.path + "/portrait_fantastic." + comic.thumbnail.extension} alt=""/>
                      <div className="caption">
                        <h4>{comic.name}</h4>
                      </div>
                    </div>

                    </Button>

                </div>
              );

          break;
      default:
        charactersList = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
        break;
    }

    return (
      <div className="container Quiz">
        <Navbar location = {this.state.type}/>
        <h1>det här är quiz </h1>
         <div className="row">
               
        </div>

        <div className="row">
          {charactersList}
        </div>
       
        

        </div>

    );
  }
}

export default Quiz;
