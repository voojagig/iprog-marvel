import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/Model'


import Welcome from './Welcome/Welcome';
import ShowComics from './ShowComics/ShowComics';
import ShowCharacters from './ShowCharacters/ShowCharacters';
import Login from "./Login/Login";
import Register from "./Register/Register";
import Quiz from "./Quiz/Quiz";






class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'MarvelQuiz',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<h1 className="App-title jumbotron" >{this.state.title}</h1>*/}
          
          {/* We rendered diffrent component based on the path */}
          <Route exact path="/" render={() => <Welcome model={modelInstance}/>}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>

          <Route path="/comics" render={() => <ShowComics model={modelInstance}/>}/>
          <Route path="/characters" render={() => <ShowCharacters model={modelInstance}/>}/>
          <Route path="/Quiz" exact component={Quiz}/>

        </header>
     
      </div>
    );
  }
}

export default App;
