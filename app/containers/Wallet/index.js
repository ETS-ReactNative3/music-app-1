/**
 *
 * Wallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { faWallet, faCircle } from '@fortawesome/free-solid-svg-icons';
import makeSelectWallet from './selectors';
import reducer from './reducer';
import saga from './saga';

import PaperCard from '../../components/PaperCard';

export function Wallet() {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });

  const [balance] = React.useState(11);

  return (
    <PaperCard title="My Wallet">
      <div>
        Check out your balance and activity, buy additional credits for your
        next campaign
      </div>
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <span className="ml-2 h6">
          <FontAwesomeIcon
            icon={faCircle}
            className={
              balance > 10 ? 'mr-2 mb-0 text-success' : 'mr-2 mb-0 text-danger'
            }
          />
          CURRENT BALANCE
        </span>
        <span className="h1">
          {balance}.00
          <FontAwesomeIcon icon={faWallet} className="ml-2 h3 mb-0" />
        </span>
      </div>
      <Container fluid className="mt-5">
        <Row>
          <Col md={5} lg={4} xl={3}>
            <Card className="bg-transparent blick-border">
              <ListGroup>
                <ListGroup.Item className="p-4 bg-transparent border-bottom-primary">
                  <div className="h1">Units</div>
                  <small className="h6 text-success">
                    Purchase credits one by one for your own purpose
                  </small>
                </ListGroup.Item>
                <ListGroup.Item className="p-4 bg-transparent">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        Choose the amount of credits you’d like to purchase
                      </Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        size="lg"
                        type="number"
                        min="0"
                        placeholder="Enter Amount"
                      />
                      <Form.Text className="text-muted">
                        A minimum of 10 is required
                      </Form.Text>
                    </Form.Group>
                    <Button variant="success" type="submit">
                      Buy
                    </Button>
                  </Form>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={7} lg={8} xl={9}>
            Credit Packs
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-5">
        <Row>
          <Col md={7} lg={8} xl={9}>
            <Card className="bg-transparent blick-border">
              <Card.Body className="p-4">
                <div className="h2">1. Billing Information</div>
                <Form>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>Professional?</Form.Label>
                      <Form.Check
                        size="lg"
                        type="switch"
                        id="custom-switch"
                        label="You represent a registered professional entity (company, association, independent contractor)"
                      />
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        size="lg"
                        type="text"
                        placeholder="Enter first name"
                      />
                    </Col>

                    <Col>
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        size="lg"
                        type="text"
                        placeholder="Enter last name"
                      />
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>Date of birth</Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        size="lg"
                        type="text"
                        placeholder="Enter date of birth"
                      />
                    </Col>

                    <Col>
                      <Form.Label>Citizenship</Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        size="lg"
                        as="select"
                        placeholder="Citizenship"
                      >
                        <option>India</option>
                        <option>Nepal</option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>Entity name</Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        size="lg"
                        type="text"
                        placeholder="Enter entity name"
                      />
                    </Col>

                    <Col>
                      <Form.Label>VAT number</Form.Label>
                      <Form.Control
                        className="bg-transparent"
                        size="lg"
                        type="text"
                        placeholder="Enter VAT number"
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} lg={4} xl={3}>
            <Card className="bg-transparent blick-border">
              <ListGroup>
                <ListGroup.Item className="p-4 bg-transparent border-bottom-primary">
                  <div className="h2">
                    <FontAwesomeIcon icon={faWallet} className="mr-2 h3 mb-0" />
                    Purchase
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="py-2 px-4 bg-transparent">
                  <Row>
                    <Col md={9}>Available credits</Col>
                    <Col md={3} className="text-right">
                      0
                      <FontAwesomeIcon icon={faWallet} className="ml-2 mb-0" />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-2 px-4 h4 bg-transparent">
                  <Row>
                    <Col md={6}>Total</Col>
                    <Col md={6} className="text-right">
                      0
                      <FontAwesomeIcon icon={faWallet} className="ml-2 mb-0" />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-2 px-4 pb-4 bg-transparent">
                  <Row>
                    <Col md={9}>Post-checkout credits</Col>
                    <Col md={3} className="text-right">
                      0
                      <FontAwesomeIcon icon={faWallet} className="ml-2 mb-0" />
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </PaperCard>
  );
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  wallet: makeSelectWallet(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Wallet);
