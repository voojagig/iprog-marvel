import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/Model'


import Welcome from './Welcome/Welcome';
import Comics from './Comics/Comics';
import Characters from './Characters/Characters';




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
          <h1 className="App-title jumbotron" >{this.state.title}</h1>
          
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>

          <Route path="/comics" render={() => <Comics model={modelInstance}/>}/>
          <Route path="/characters" render={() => <Characters model={modelInstance}/>}/>
        
          {/*}<Route path="/showdish/:id" render={props => <ShowDish model={modelInstance} id={props.match.params.id}/>}/>
          
          <Route path="/ConfirmDinner" render={() => <ConfirmDinner model={modelInstance}/>}/>
          
          <Route path="/Print" render={() => <Print model={modelInstance}/>}/> */}


        
        </header>
      </div>
    );
  }
}

export default App;
