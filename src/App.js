import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/Model'
import firebase, { auth, provider } from './firebase';

import Navbar from './Navbar/Navbar';
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
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <Navbar toLogin={ () => this.login() } location = {this.state.type}/>
          
          {/* We rendered diffrent component based on the path */}
          <Route exact path="/" render={() => <Welcome model={modelInstance}/>}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>

          <Route path="/comics" render={() => <ShowComics model={modelInstance}/>}/>
          <Route path="/characters" render={() => <ShowCharacters model={modelInstance}/>}/>
          <Route path="/Quiz" exact component={Quiz}/>

        </header>

        <div className="wrapper">
          {this.state.user ?
            <div>
              <h2>Välkommen in! {this.state.user.email} </h2>
              <button onClick={this.logout}>Log Out</button>
            </div>
            
            :
            <div>
              <h2>Du är ej inloggad</h2>
              <button onClick={this.login}>Log in</button>
            </div>
          }
        </div>
     
      </div>
    );
  }
}

export default App;
