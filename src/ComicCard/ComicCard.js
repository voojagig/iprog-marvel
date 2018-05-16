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

  // handleClose() {
  //   this.setState({ 
  //     show: false, 
  //   });
  // } 

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      update: 'yess',
    });
  }


    handleClose() {
    //const { onCloseRequest } = this.props;
      this.props.onClick();
    };
  

  render() {
    let newComic = null;
    console.log("props: " + this.props.show);

    switch (this.props.comic) {
      case null:
        newComic = <em> inget att se här</em> 
        break;

      default: 
        newComic = 

        <Modal show={this.props.show}>
          
          <Modal.Header>
            <Modal.Title id='ModalHeader'>{this.props.comic.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button onClick={this.handleClose}>Close</button>
          </Modal.Body>
          <Modal.Footer>fot</Modal.Footer>
        </Modal>

    };


    return(

      <div>
        <h2>Welcome to ComicCard</h2>
        {newComic}
      </div>
      );
  }
}


export default ComicCard;