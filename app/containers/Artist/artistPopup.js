import React from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';

const ArtistPopup = ({ artist, handleClose, showMoreInfo }) => {
    return (
        <Modal
            show={showMoreInfo}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col>
                        here i am
            </Col>
                </Row>
            </Container>
        </Modal>
    )
}

export default ArtistPopup;