import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {makeSelectSubscriptionLoader, makeSelectSubscriptionPlans} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {getPlans} from "./actions";
import LoadingIndicator from "../../components/LoadingIndicator";
import {axiosInstance} from "../../utils/api";
import {toast} from "react-toastify";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_KcTV8d4CSSGpMfe4PIKvUeFI00hDyI8a1d');

export function Subscription({getPlansList, subscriptionPlans, subscriptionLoader}) {
  useInjectReducer({key: 'subscription', reducer});
  useInjectSaga({key: 'subscription', saga});

  useEffect(() => {
    getPlansList();
  }, []);

  const handleClick = async event => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axiosInstance().post(
      '/subscriptions/create-checkout-session',
      {
        id: event,
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
  }

  return <div>
    {subscriptionLoader || !subscriptionPlans ? <LoadingIndicator/> : <div>
      {subscriptionPlans.map(item => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <button type="button" className="btn btn-danger" onClick={() => handleClick(item.id)}>Buy</button>
        </div>
      ))}
    </div>}
  </div>;
}

Subscription.propTypes = {
  getPlansList: PropTypes.func.isRequired,
  subscriptionLoader: PropTypes.bool,
  subscriptionPlans: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  subscriptionPlans: makeSelectSubscriptionPlans(),
  subscriptionLoader: makeSelectSubscriptionLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPlansList: () => dispatch(getPlans()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Subscription);
