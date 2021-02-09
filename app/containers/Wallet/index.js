/**
 *
 * Wallet
 *
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {faWallet, faCircle} from '@fortawesome/free-solid-svg-icons';
import {loadStripe} from '@stripe/stripe-js';
import {Link} from 'react-router-dom';
import reducer from './reducer';
import saga from './saga';

import PaperCard from '../../components/PaperCard';
import {makeSelectUserWallet} from '../App/selectors';
import {axiosInstance} from '../../utils/api';
import {toast} from "react-toastify";
import {makeSelectWallet} from "./selectors";

const stripePromise = loadStripe('pk_test_KcTV8d4CSSGpMfe4PIKvUeFI00hDyI8a1d');

export function Wallet({userCredit}) {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});

  const [amount, setAmount] = useState(true);

  const handleClick = async event => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axiosInstance().post(
      '/order/create-checkout-session',
      {
        price: amount,
      },
    );

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <PaperCard title="My Wallet">
      <div>
        Check out your balance and activity, buy additional credits for your
        next campaign
      </div>
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <span className="h6">
          <FontAwesomeIcon
            icon={faCircle}
            className={
              userCredit > 10
                ? 'mr-2 mb-0 text-success'
                : 'mr-2 mb-0 text-danger'
            }
          />
          CURRENT BALANCE
          <Link to="/wallet/history"> View history</Link>
        </span>
        <span className="h1">
          {userCredit}
          <FontAwesomeIcon icon={faWallet} className="ml-2 h3 mb-0"/>
        </span>
      </div>
      <Row className="mt-4">
        <Col lg={6}>
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
                      className="bg-transparent text-white"
                      size="lg"
                      type="number"
                      min="0"
                      placeholder="Enter Amount"
                      onChange={value => {
                        setAmount(value.target.value);
                      }}
                    />
                    <Form.Text className="text-muted">
                      A minimum of 10 is required
                    </Form.Text>
                  </Form.Group>
                  <Button
                    disabled={amount < 10}
                    onClick={handleClick}
                    role="link"
                    variant="success"
                    type="button"
                  >
                    Buy
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </PaperCard>
  );
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userCredit: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  wallet: makeSelectWallet(),
  userCredit: makeSelectUserWallet(),
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
