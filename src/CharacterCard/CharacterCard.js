import React, { Component } from 'react';
import './CharacterCard.css';
import { modelInstance } from '../data/Model';
import Modal from 'react-bootstrap/lib/Modal';



class CharacterCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      comic: null,
      show: this.props.show,
    }

    this.handleClose = this.handleClose.bind(this);
    
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

  render() {
    let newCharacter = null;
    let ComicsList = null;
    let ComicsTitle = null;

    switch (this.props.character) {
      case null:
        break;

      default: 
      	if (this.props.character.comics.items[0] !== undefined){
        	ComicsTitle = <h2>Comics</h2>;

          	console.log(this.props.character.comics.items[0].name);
          	ComicsList = this.props.character.comics.items.map((comic) =>
            	<p key={comic.name}> {comic.name} </p>
          	);
        }
        newCharacter = 

        <Modal show={this.props.show}>         
          <Modal.Header>
            <Modal.Title id='ModalTitle'>{this.props.character.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-xs-4 thumbnail">
                <img src={this.props.character.thumbnail.path + "/portrait_fantastic." + this.props.character.thumbnail.extension} alt=""/>
              </div>
              <div className="col-xs-8">
                <p>{this.props.character.description}</p>

              </div>
            </div>
            <div className="row characters">
            {ComicsTitle}
            {ComicsList}
            </div>
          </Modal.Body>

          <Modal.Footer>          
            <button onClick={this.handleClose}>Close</button>
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