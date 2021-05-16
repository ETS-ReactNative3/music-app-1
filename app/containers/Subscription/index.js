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
import PaperCard from "../../components/PaperCard";
import './index.scss';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    {subscriptionLoader || !subscriptionPlans ? <LoadingIndicator/> : <PaperCard title="Subscription Plans">
      <div className="row">
        {subscriptionPlans.map(item => (
          <div key={item.id} className="col-12 col-lg-4">
            <div className="card bg-dark mb-5 mb-lg-6 px-2">
              <div className="card-header border-light py-5 px-4">
                <div className="d-flex mb-3">
                  <span className="h5 mb-0">$</span>
                  <span className="price display-2 mb-0">{item.price / 100}</span>
                  {/*<span className="h6 font-weight-normal align-self-end">/month</span>*/}
                </div>
                <h4 className="mb-3 text-black">{item.title}</h4>
              </div>
              <div className="card-body pt-5">
                <ul className="list-group simple-list">
                  <li className="list-group-item font-weight-normal">
                    <span className="icon-gray">
                      <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                      Ad-free listening
                    </span>
                  </li>
                  <li className="list-group-item font-weight-normal">
                    <span className="icon-gray">
                      <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                      Access full catalog
                    </span>
                  </li>
                  <li className="list-group-item font-weight-normal">
                    <span className="icon-gray">
                      <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                      Expertly curated playlists
                    </span>
                  </li>
                  <li className="list-group-item font-weight-normal">
                    <span className="icon-gray">
                      <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                      Automatic entry into draws & competitions
                    </span>
                  </li>
                  <li className="list-group-item font-weight-normal">
                    <span className="icon-gray">
                      <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                      Earn Rewards
                    </span>
                  </li>
                  <li className="list-group-item font-weight-normal">
                    <span className="icon-gray">
                      <FontAwesomeIcon icon={faCheck} className="mr-2"/>
                      Support your chosen artists directly
                    </span>
                  </li>
                </ul>
              </div>
              <div className="card-footer px-4 pb-4">
                <button type="button" className="btn btn-block btn-success btn-outline-gray animate-up-2"
                        onClick={() => handleClick(item.id)}>Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PaperCard>}
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
