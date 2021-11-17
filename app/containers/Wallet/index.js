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
import Button from 'react-bootstrap/Button';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {loadStripe} from '@stripe/stripe-js';
import reducer from './reducer';
import saga from './saga';
import PaperCard from '../../components/PaperCard';
import {makeSelectUserWallet} from '../App/selectors';
import {axiosInstance} from '../../utils/api';
import {toast} from "react-toastify";
import {makeSelectWallet} from "./selectors";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import PlanSvg from "../../images/svg/plan_icon_color.svg";

const stripePromise = loadStripe('pk_live_51JwPeEKvevnJrmTxwkEmeCVJC1qHvP5bkipiKE3uCEsltBlhLyp7bLajN4PbE8Kd5ZGRQX0XoXNdRSIlRK1nGLkZ00kHQObyzu');


const schema = yup.object().shape({
  amount: yup.number('Amount is required')
    .typeError('Please enter the credit amount')
    .positive()
    .integer('Amount should not be in decimal values')
    .min(10, 'Amount should be more than 10')
    .required('Amount is required'),
});

export function Wallet({userCredit}) {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});

  const [dollarAmount, setDollarAmount] = useState(0);

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => handleClick(data.amount);

  const changeDollarAmount = credit => {
    setDollarAmount((+credit + (+credit * 0.30)))
  }

  const handleClick = async amount => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axiosInstance().post(
      '/order/create-checkout-session',
      {
        price: (+amount + (+amount * 0.30)),
        number: amount
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
          CURRENT BALANCE <img src={PlanSvg} alt="wallet Logo" width={17} height={17}/>{' '} {userCredit}
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="credit">
                        Enter credits
                      </label>
                      <input
                        type="number"
                        className={`form-control bg-transparent text-white ${
                          errors.amount ? 'is-invalid' : ''
                        }`}
                        size="lg"
                        name="amount"
                        id="credit"
                        ref={register}
                        onChange={e => changeDollarAmount(e.target.value)}
                        placeholder="Enter Amount"
                      />
                      <div className="invalid-feedback">
                        {errors.amount && errors.amount.message}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="amount">Dollar Amount</label>
                      <input type="text" readOnly className="form-control bg-transparent text-white" id="amount"
                             value={dollarAmount}/>
                    </div>
                  </div>
                  <Button
                    role="link"
                    variant="success"
                    type="submit"
                  >
                    Buy
                  </Button>
                </form>
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
}

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
