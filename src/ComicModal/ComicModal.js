import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Modal } from 'react-bootstrap/lib/Modal'
import { ModalHeader } from 'react-bootstrap/lib/ModalHeader';

class ComicModal extends React.Component {

  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    //alert("inuti consructor");
    this.state = {
      show: this.props.show,
      comic: this.props.comic,
    };
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose} aria-labelledby="ModalHeader">          
        <Modal.Header closeButton>
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
  
    );
  }
}


export default ComicModal