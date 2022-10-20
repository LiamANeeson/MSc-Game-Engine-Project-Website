import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const AskQuestionModel = (props) => {
  return (
    <Modal show={props.open} onHide={props.onClose} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default AskQuestionModel