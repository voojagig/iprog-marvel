import React, { Component } from 'react';
import './Characters.css';
import { modelInstance } from '../data/Model'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader';
import ModalBody from 'react-modal';
import PropTypes from 'prop-types';
import CharacterCard from '../CharacterCard/CharacterCard';

class Characters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: '/characters',
      showModal: false,
      character: null,

    };
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this)

  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
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
      update: 'yess',
    });
  }

//Function that handles the API call when the user clicks on 
//a character,  sets the result in state and sets state so Modal can be shown. 
  handleCharacter(id) {
    modelInstance.getCharacter(id).then(characterResults => {
      this.setState({ 
        character: characterResults.data.results[0],
        showModal: true, 
      });
      console.log(this.state.character);
    });
    
  }

  render() {
    let characterList = null;
        
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned comics

    switch (this.props.status) {
      case 'INITIAL':
        characterList = <h3>Choose a letter to see characters</h3>
        break;
      case 'LOADING':
        characterList = <em>Loading...</em>
        break;
      case 'LOADED':
          characterList = this.props.characters.map((character) =>
                <div className="col-md-2 col-sm-3 col-xs-4 box" key={character.id}>

                    <Button className="button" onClick={ () => this.handleCharacter(character.id)}>

                      <div className="thumb">
                        <img src={character.thumbnail.path + "/portrait_fantastic." + character.thumbnail.extension} alt=""/>
                        <div className="caption">
                          <h4 className="name">{character.name}</h4>
                        </div>
                      </div>

                    </Button>
                </div>
              );

          break;
      default:
        characterList = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
        break;
    }
    return (
      <div className="Character" key="character">
        <div className="row">
          <CharacterCard onClick={this.toggleModal.bind(this)} character={this.state.character} show={this.state.showModal}/>
        </div>
        <div className="container-fluid">
            {characterList}
        </div>
      </div>
    
    );
  }
}

export default Characters;
