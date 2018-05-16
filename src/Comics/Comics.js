import React, { Component } from 'react';
import './Comics.css';
import { modelInstance } from '../data/Model'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader';
import ModalBody from 'react-modal';
import PropTypes from 'prop-types';



//var Modal = require('react-bootstrap/lib/Modal').default;


class Comics extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL',
      title: Comics,
      show: false,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);


  }


  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.addObserver(this)

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

  handleClose() {
    this.setState({ 
      show: false, 
    });
  }

  handleShow() {
    this.setState({ 
      show: true,
    });
     console.log("handleShow" + this.state.show)
  }

  render() {
    let comicsList = null;


    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned comics

    switch (this.props.status) {
      case 'INITIAL':
        comicsList = <em>Choose a letter to see comics</em>
        break;
      case 'LOADING':
        comicsList = <em>Loading...</em>
        break;
      case 'LOADED':
        console.log(this.props.comics);
          comicsList = this.props.comics.map((comic) =>
                <div className="col-md-3 col-sm-4" key={comic.id}>
                    <Link to={"/comics/" + comic.id}>
                    <div className="thumbnail">
                      <img src={comic.thumbnail.path + "/portrait_fantastic." + comic.thumbnail.extension} alt=""/>
                      <div className="caption">
                        <h4>{comic.title}</h4>
                      </div>
                    </div>
                    </Link>
                </div>
              );

          break;
      default:
        comicsList = <b>Failed to load data, please try again. Verify that you have network connection, please. </b>
        break;
        
    }
    return (
      <div className="Comics" key="comics">
        <div className="container">
          <div className="row row-eq-height">
            <Button  bsStyle="primary" onClick={this.handleShow}>Visa Modal</Button>
            <Modal show={this.state.show} onHide={this.handleClose} aria-labelledby="ModalHeader"
>          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use
            // the convenient `Dismiss` component, it will
            // trigger `onHide` when clicked
</Modal.Footer>
      </Modal>
  
            {comicsList}
          </div>
        </div>
      </div>
    
    );
  }
}


export default Comics;
