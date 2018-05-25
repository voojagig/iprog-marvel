import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/Model'
import firebase, { auth } from './firebase';

import Navbar from './Navbar/Navbar';
import Welcome from './Welcome/Welcome';
import ShowComics from './ShowComics/ShowComics';
import ShowCharacters from './ShowCharacters/ShowCharacters';
import Login from "./Login/Login";

import Quiz from "./Quiz/Quiz";
import Saved from "./Saved/Saved";
import Highscores from "./Highscores/Highscores";

var provider = new firebase.auth.GoogleAuthProvider();




class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'MarvelQuiz',
      user: null
  }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });

    });

  }

  componentDidMount() {
     auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    } 
  });
  this.setState({type: Route.path})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <Navbar toLogin={ () => this.login() } toLogout={ () => this.logout() } location = {this.state.type} user={this.state.user}/>
          
          {/* We rendered diffrent component based on the path */}
          <Route exact path="/home" render={() => <Welcome model={modelInstance}/>}/>
          <Route path="/login" exact component={Login}/>

          <Route path="/comics" render={() => <ShowComics model={modelInstance}/>}/>
          <Route path="/characters" render={() => <ShowCharacters model={modelInstance}/>}/>
          <Route path="/Quiz" exact component={Quiz}/>
          <Route path="/saved" render={() => <Saved model={modelInstance}/>} />
          <Route path="/highscores" render={() => <Highscores model={modelInstance}/>} />

        </header>

        
     
      </div>
    );
  }
}

export default App;
