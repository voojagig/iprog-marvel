import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/Model'


import Welcome from './Welcome/Welcome';
import Comic from './ComicModal/Comic';
import ShowOptions from './ShowOptions/ShowOptions';
import Characters from './Characters/Characters';
import Login from "./Login/Login";
import Register from "./Register/Register";





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
          <Route exact path="/" component={Welcome}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>

          <Route path="/comics" render={() => <ShowOptions model={modelInstance}/>}/>
         {/*} <Route path="/comics/:id" render={props =><Comic model={modelInstance} id={props.match.params.id}/>}/>*/}
          <Route path="/characters" render={() => <Characters model={modelInstance}/>}/>
        </header>
     
      </div>
    );
  }
}

export default App;
