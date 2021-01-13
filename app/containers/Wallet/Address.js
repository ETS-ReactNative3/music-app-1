import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { faAngleRight, faWallet } from '@fortawesome/free-solid-svg-icons';
import { makeSelectUserWallet } from '../App/selectors';
import { useLocation, useParams } from 'react-router-dom';
import { getQueryVariable } from '../../utils';
import history from 'utils/history';
import * as Yup from 'yup';
import { zipRange } from '../../utils/index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonLoader from '../../components/ButtonLoader';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from '../../utils/useResponsiveFontSize';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { createPaymentAction } from './actions';

const AddressWallet = ({
  userCredits,
  createPayment
}) => {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });
  const { search } = useLocation();
  const [card, setCard] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const requestedAmount = getQueryVariable(search, 'amount');
  const postCheckoutValue = userCredits + Number(requestedAmount);
  React.useEffect(() => {
    let n = new Number(requestedAmount);
    console.log(n, _.isNumber(n))
    if (!_.isNumber(n) || _.isNaN(n)) {
      history.push('/');
    }
  }, [requestedAmount]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .trim()
      .matches(/^[a-zA-Z ]+$/, "Only Character allowed")
    ,

    addressLine1: Yup.string()
      .required('Required')
      .trim()
      .matches(/^[a-zA-Z0-9\s, '-]*$/, "Only Character allowed"),
    addressCity: Yup.string()
      .required('Required')
      .trim()
      .matches(/^[a-zA-Z ]+$/, "Only Character allowed"),
    addressState: Yup.string()
      .required('Required').trim()
      .matches(/^[a-zA-Z ]+$/, "Only Character allowed"),
    addressCountry: Yup.string().required('Required'),
    addressZip: Yup.string().required('Required'),

  });

  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const values = getValues();

  const [addressInfo, setAddressInfo] = React.useState({});

  const onSubmit = data => {
    setAddressInfo(data);
  };

  const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
      () => ({
        style: {
          base: {
            fontSize,
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        }
      }),
      [fontSize]
    );

    return options;
  };

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmitPayment = async event => {
    event.preventDefault();
    console.log('here', elements, elements.getElement(CardNumberElement))
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: addressInfo.name,
        address: {
          city: addressInfo.city,
          country: addressInfo.country,
          line1: addressInfo.addressLine1,
          // "line2": null,
          postal_code: addressInfo.addressZip,
          state: addressInfo.addressState
        }
      }
    });

    stripe.createToken(elements).then(function(result) {
      // Handle result.error or result.token
      console.log(result, 'create TOken');
    });
    console.log(payload, 'payload');
    createPayment({ payload, addressInfo, card, cvv })
  };



  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={7} lg={8} xl={9}>
          {!addressInfo.hasOwnProperty('name') && <Card className="bg-transparent blick-border">
            <Card.Body className="p-4">
              <div className="h2">1. Billing Information</div>
              <form onSubmit={handleSubmit(onSubmit)}>

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
                      <Form.Label>Name</Form.Label>
                      <input
                        style={{ width: '50%' }}
                        name="name"
                        placeholder="Enter name"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        ref={register}
                      />
                      <div className="invalid-feedback" style={{ display: 'block' }}>
                        {errors.name && errors.name.message}
                      </div>
                    </Col>


                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>Address Line</Form.Label>

                      <input
                        name="addressLine1"
                        placeholder="Enter address line 1"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        ref={register}
                      />
                      <div className="invalid-feedback" style={{ display: 'block' }}>
                        {errors.addressLine1 && errors.addressLine1.message}
                      </div>
                    </Col>


                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>Address Line 2</Form.Label>

                      <input
                        name="addressLine2"
                        placeholder="Enter address line 2 (Optional)"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        ref={register}
                      />

                    </Col>


                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>City</Form.Label>

                      <input
                        name="addressCity"
                        placeholder="Enter city"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        ref={register}
                      /><div className="invalid-feedback" style={{ display: 'block' }}>
                        {errors.addressCity && errors.addressCity.message}
                      </div>
                    </Col>

                    <Col>
                      <Form.Label>State</Form.Label>
                      <input
                        name="addressState"
                        placeholder="Enter state"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        ref={register}
                      />
                      <div className="invalid-feedback" style={{ display: 'block' }}>
                        {errors.addressState && errors.addressState.message}
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-4">
                    <Col>
                      <Form.Label>Country Code</Form.Label>
                      <select
                        name="addressCountry"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        ref={register}
                      >
                        <option value="">Select Country Code</option>
                        {Object.keys(zipRange).map((zip) =>
                          <option value={zip}>{zip}</option>
                        )}
                      </select>
                      <div className="invalid-feedback" style={{ display: 'block' }}>
                        {errors.addressCountry && errors.addressCountry.message}
                      </div>
                    </Col>

                    <Col>
                      <Form.Label>ZipCode</Form.Label>
                      <input
                        name="addressZip"
                        placeholder="Enter Zip Code"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        ref={register}
                      />
                      <div className="invalid-feedback" style={{ display: 'block' }}>
                        {errors.addressZip && errors.addressZip.message}
                      </div>
                      {values.addressCountry && values.addressZip && !zipRange[values.addressCountry].test(values.addressZip) &&

                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          Invalid zip code
                        </div>
                      }
                    </Col>
                  </Row>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {false ? (
                      <ButtonLoader />
                    ) : (
                        <button className="btn btn-primary btn-block" style={{ width: '20%' }} type="submit">
                          Submit<FontAwesomeIcon icon={faAngleRight} />
                        </button>
                      )}
                  </div>
                </Form>
              </form>
            </Card.Body>
          </Card>
            || <Card className="bg-transparent blick-border">
              <Card.Body className="p-4">
                <div className="h2">1. Billing Information</div>
                <div>{addressInfo.name}</div>
                <div>{addressInfo.addressLine1}</div>
                <div>{addressInfo.addressState}</div>
                <div>{addressInfo.addressCountry}</div>
              </Card.Body>
            </Card>}
          {addressInfo.hasOwnProperty('name') && <Card className="bg-transparent blick-border">
            <Card.Body className="p-4">
              <div className="h2">2. Payment Information</div>
              <form onSubmit={handleSubmitPayment}>
                <Form.Label>
                  Card number</Form.Label>
                <CardNumberElement
                  options={options}
                  onReady={() => {
                    console.log("CardNumberElement [ready]");
                  }}
                  onChange={event => {

                    console.log("CardNumberElement [change]", event);
                    setCard(event.target.value);

                  }}
                  onBlur={(event) => {
                    console.log("CardNumberElement [blur]", event);
                  }}
                  onFocus={() => {
                    console.log("CardNumberElement [focus]");
                  }}
                />
                <Form.Label>
                  Expiration date</Form.Label>
                <CardExpiryElement
                  options={options}
                  onReady={() => {
                    console.log("CardNumberElement [ready]");
                  }}
                  onChange={event => {
                    console.log("CardNumberElement [change]", event);
                  }}
                  onBlur={() => {
                    console.log("CardNumberElement [blur]");
                  }}
                  onFocus={() => {
                    console.log("CardNumberElement [focus]");
                  }}
                />
                <Form.Label>
                  CVC</Form.Label>
                <CardCvcElement
                  options={options}
                  onReady={() => {
                    console.log("CardNumberElement [ready]");
                  }}
                  onChange={event => {
                    console.log("CardNumberElement [change]", event);
                    setCvv(event.target.value);

                  }}
                  onBlur={() => {
                    console.log("CardNumberElement [blur]");
                  }}
                  onFocus={() => {
                    console.log("CardNumberElement [focus]");
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {false ? (
                    <ButtonLoader />
                  ) : (
                      <button disabled={!stripe} className="btn btn-primary btn-block" style={{ width: '20%' }} type="submit">
                        Submit<FontAwesomeIcon icon={faAngleRight} />
                      </button>
                    )}
                </div>

              </form>
            </Card.Body>
          </Card>}
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
                    {userCredits}
                    <FontAwesomeIcon icon={faWallet} className="ml-2 mb-0" />
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="py-2 px-4 h4 bg-transparent">
                <Row>
                  <Col md={6}>Total</Col>
                  <Col md={6} className="text-right">
                    {userCredits}
                    <FontAwesomeIcon icon={faWallet} className="ml-2 mb-0" />
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="py-2 px-4 pb-4 bg-transparent">
                <Row>
                  <Col md={9}>Post-checkout credits</Col>
                  <Col md={3} className="text-right">
                    {postCheckoutValue}
                    <FontAwesomeIcon icon={faWallet} className="ml-2 mb-0" />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}


AddressWallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userCredits: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  userCredits: makeSelectUserWallet()
});

function mapDispatchToProps(dispatch) {
  return {
    createPayment: (data) => dispatch(createPaymentAction(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddressWallet);
