/*
 *
 * Subscription actions
 *
 */

import {
  CREATE_SUBSCRIPTION_PAYMENT_REQUEST,
  CREATE_SUBSCRIPTION_PAYMENT_SUCCESS,
  GET_PLANS,
  GET_PLANS_SUCCESS
} from './constants';

export function getPlans() {
  return {
    type: GET_PLANS,
  };
}

export function getPlansSuccess(plans) {
  return {
    type: GET_PLANS_SUCCESS,
    plans
  };
}

export function createSubscriptionPayment(id) {
  return {
    type: CREATE_SUBSCRIPTION_PAYMENT_REQUEST,
    id
  };
}

export function createSubscriptionPaymentSuccess(data) {
  return {
    type: CREATE_SUBSCRIPTION_PAYMENT_SUCCESS,
    data
  };
}
