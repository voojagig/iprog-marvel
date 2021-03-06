import React, { Component } from 'react';
import './CharacterCard.css';
import { modelInstance } from '../data/Model';
import Modal from 'react-bootstrap/lib/Modal';


import star from "./star.png"
import fullStar from "./star-filled.png"
import firestoreDB from '../data/database';
import firebase from '../firebase.js';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

      

//Credits
//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


class CharacterCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      comic: null,
      show: this.props.show,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this);
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }


  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    modelInstance.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      update: 'yess',
    });
  }

  handleClose() {
    this.props.onClick();
  }
  handleClick(character, event){
    //i character:
      //om man inte är inloggad ska knappen inte finnas där. 
      //kolla om comics är sparad sen tidigare. skicka med props som beskriver dessa. 
    //checks if comic is saved, if not it marks the star and saves into databas. 
      if(event.target.src === star){
        event.target.src = fullStar;
        //save comic in database
        firestoreDB.saveCharacter(character);
      }
      else{
        //removes saved data in database
        firestoreDB.deleteCharacter(character);
        event.target.src = star;

      }
  }

  render() {
    let newCharacter = null;
    let ComicsList = null;
    let ComicsTitle = null;
    let user = firebase.auth().currentUser; //gets the current users information from firebase
    let tooltip = null;

    switch (this.props.character) {
      case null:
        break;

      default: 
      	if (this.props.character.comics.items[0] !== undefined){
        	ComicsTitle = <h2>Comics</h2>;

          	ComicsList = this.props.character.comics.items.map((comic) =>
            	<p key={comic.name} className="left"> {comic.name} </p>
          	);
        }
      switch (this.props.isSaved){
        case true:
          tooltip = <Tooltip id="modal-tooltip">Remove character from favorites</Tooltip>;
          break;
        case false: 
          if(user === null){
            tooltip = <Tooltip id="modal-tooltip">You must log in to save characters</Tooltip>;
            break;
          }
          tooltip = <Tooltip id="modal-tooltip">Save character</Tooltip>;
          break;

      }
        newCharacter = 

        <Modal show={this.props.show}>         
          <Modal.Header>
            <div className="row">
              <div className="col-xs-10"> 
                <Modal.Title id='ModalTitle'>{this.props.character.name}</Modal.Title>
              </div>
              <div className="col-xs-2">  
                <OverlayTrigger overlay={tooltip}>
                  <div>
                    <Button onClick={this.handleClick.bind(this, this.props.character)} disabled={(user === null) ? true : false}><img src={this.props.isSaved ? fullStar : star} alt="" /></Button>
                  </div>
                </OverlayTrigger>
      
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-xs-4 thumbnail">
                <img src={this.props.character.thumbnail.path + "/portrait_fantastic." + this.props.character.thumbnail.extension} alt=""/>
              </div>
              <div className="col-xs-7">
                <p>{this.props.character.description}</p>

              </div>
            </div>
            <div className="row characters">
            {ComicsTitle}
            {ComicsList}
            </div>
          </Modal.Body>

          <Modal.Footer>          
            <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
        </Modal>

    };


    return(

      <div>
        {newCharacter}
      </div>
      );
  }
}


export default CharacterCard;