import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Modal from 'react-bootstrap/lib/Modal'
import ModalHeader from 'react-bootstrap/lib/ModalHeader';

class ComicModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} aria-labelledby="ModalHeader"
>    

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
         
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default ComicModal