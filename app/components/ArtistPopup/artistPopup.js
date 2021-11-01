import React from 'react';
import {Modal} from 'react-bootstrap';

const ArtistPopup = ({artist, handleClose, showMoreInfo}) => {
  return (
    <Modal
      show={showMoreInfo}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{artist.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Biography</h3>
        {artist.artistInformation && artist.artistInformation.biography && <p>{artist.artistInformation.biography}</p>}
      </Modal.Body>
    </Modal>
  )
}
export default ArtistPopup;

