import React, { Component } from 'react';
import './ComicCard.css';
import { modelInstance } from '../data/Model';
import Modal from 'react-bootstrap/lib/Modal';



class ComicCard extends Component {

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
    let newComic = null;
    let CharacterTitle = null;
    let CharacterList = null;
;

    switch (this.props.comic) {
      case null:
        break;

      default: 
        if (this.props.comic.characters.items[0] !== undefined){
          CharacterTitle = <h2>Characters</h2>;

          console.log(this.props.comic.characters.items[0].name);
          CharacterList = this.props.comic.characters.items.map((character) =>
            <p key={character.name}> {character.name} </p>
          );

        }
        
        newComic = 

        <Modal show={this.props.show}>         
          <Modal.Header>
            <Modal.Title id='ModalTitle'>{this.props.comic.title}</Modal.Title>
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