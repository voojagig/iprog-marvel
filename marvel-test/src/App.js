/* global $ */
import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/MarvelModel'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'MarvelQuiz',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title jumbotron" >{this.state.title}</h1>
          
          {/* We rended diffrent component based on the path */}
         
          <Route path="/" render={() => <Welcome model={modelInstance}/>}/>
          
          {/*<Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
        
          <Route path="/showdish/:id" render={props => <ShowDish model={modelInstance} id={props.match.params.id}/>}/>
          
          <Route path="/ConfirmDinner" render={() => <ConfirmDinner model={modelInstance}/>}/>
          
          <Route path="/Print" render={() => <Print model={modelInstance}/>}/>*/}


        
        </header>
      </div>
    );
  }
}

export default App;
