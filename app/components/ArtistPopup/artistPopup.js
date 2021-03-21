import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Image, Modal, Row } from 'react-bootstrap';
import defaultImage from '../../images/album-1.jpg';

const ArtistPopup = ({ artist, handleClose, showMoreInfo}) => {
    
    return (
        <Modal
            show={showMoreInfo}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >

            <Container>

                <FontAwesomeIcon icon={faTimes} style={{ position: 'absolute', left: 0, top: 0, backgroundColor: 'red', cursor: 'pointer' }} onClick={() => { handleClose() }} />
                <div className="">
                    <Image
                        width={'100%'}
                        height={250}
                        onError={e => {
                            e.target.onerror = null;
                            e.target.src = defaultImage;
                        }}
                        src={artist.coverPhoto || ''}
                        alt="user avatar"
                    />
                </div>
                <Row>
                    <Col>
                        <h2>
                            {artist.name}
                        </h2>
                    </Col>
                </Row>
               
            </Container>
        </Modal>
    )
}
export default ArtistPopup;

