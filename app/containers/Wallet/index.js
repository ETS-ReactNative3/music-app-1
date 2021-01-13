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
import { Link } from 'react-router-dom';
import { makeSelectUserWallet } from '../App/selectors';

export function Wallet({ userCredit }) {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });

  const [amount, setAmount] = React.useState(0);
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
              userCredit > 10 ? 'mr-2 mb-0 text-success' : 'mr-2 mb-0 text-danger'
            }
          />
          CURRENT BALANCE
        <Link to="/wallet/history">View history</Link>
        </span>
        <span className="h1">
          {userCredit}.00
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
                        onChange={(value) => {
                          setAmount(value.target.value)
                        }}

                      />
                      <Form.Text className="text-muted">
                        A minimum of 10 is required
                      </Form.Text>
                    </Form.Group>
                    <Link to={`/wallet/paymentAddress?amount=${amount}`}><Button disabled={amount < 10} variant="success" type="submit">
                      Buy
                    </Button></Link>
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

    </PaperCard>
  );
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userCredit: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  wallet: makeSelectWallet(),
  userCredit: makeSelectUserWallet()
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
