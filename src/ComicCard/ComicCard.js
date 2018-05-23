import React, { Component } from 'react';
import './ComicCard.css';
import { modelInstance } from '../data/Model';
import Modal from 'react-bootstrap/lib/Modal';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';


import star from "./star.png"
import fullStar from "./star-filled.png"
import firestoreDB from '../data/database';
import firebase from '../firebase.js';

      

//Credits
//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
//<div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

class ComicCard extends Component {

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
  };
  handleClick(comic, event){
    //i comics:
      //om man inte är inloggad ska knappen inte finnas där. 
      //kolla om comics är sparad sen tidigare. skicka med props som beskriver dessa. 
    //checks if comic is saved, if not it marks the star and saves into databas. 
      if(event.target.src === star){
        event.target.src = fullStar;
        //save comic in database
        firestoreDB.saveComic(comic)
        //current user store comic.name
      //if it is saved before we will 'unsave' it.
      }
      else{
        event.target.src = star;
        //remove saved data in database
      }
  }
  

  render() {
    let newComic = null;
    let CharacterTitle = null;
    let CharacterList = null;
    let user = firebase.auth().currentUser; //gets the current users information from firebase
    let tooltip = null;

    switch (this.props.comic) {
      case null:
        break;

      default: 
        if (this.props.comic.characters.items[0] !== undefined){
          CharacterTitle = <h2>Characters</h2>;

          CharacterList = this.props.comic.characters.items.map((character) =>
            <p key={character.name} className="left"> {character.name} </p>
          );

        }
    
    switch (user){
      case null:
        tooltip = <Tooltip id="modal-tooltip">You must log in to save comics.</Tooltip>;
        break;
      default: 
        tooltip = <Tooltip id="modal-tooltip">Save comic</Tooltip>;
        break;
    }

        
        newComic = 

        <Modal show={this.props.show}>         
          <Modal.Header>
            <div className="row">
              <div className="col-xs-10">
                <Modal.Title id='ModalTitle'>{this.props.comic.title}</Modal.Title>
              </div>
              <div className="col-xs-2">
              
              <OverlayTrigger overlay={tooltip}>
                <Button onClick={this.handleClick.bind(this, this.props.comic)} disabled={(user === null) ? true : false}><img src={star} alt="" /></Button>
              </OverlayTrigger>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-xs-4 thumbnail">
                <img src={this.props.comic.thumbnail.path + "/portrait_fantastic." + this.props.comic.thumbnail.extension} alt=""/>
              </div>
              <div className="col-xs-8">
                <p>{this.props.comic.description}</p>

              </div>
            </div>
            <div className="row characters">
              {CharacterTitle}
              {CharacterList}
            </div>
          </Modal.Body>

          <Modal.Footer>          
            <button onClick={this.handleClose}>Close</button>
        </Modal.Footer>
        </Modal>

    };


    return(

      <div>
        {newComic}
      </div>
      );
  }
}


export default ComicCard;