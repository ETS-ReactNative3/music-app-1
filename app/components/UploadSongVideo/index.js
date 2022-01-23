import React, {useState} from 'react';
import {Modal} from "react-bootstrap";

const UploadSongVideo = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row">
      <div className="col">
        <div className="alert alert-success text-success alert-dismissible fade show" role="alert">
          <span onClick={handleShow} className="text-primary cursor-pointer">Click here</span> for a quick song upload tutorial.
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Song upload tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="100%" height="400" src="https://www.youtube.com/embed/jtdDZ5jb8J8" title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen/>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UploadSongVideo;
