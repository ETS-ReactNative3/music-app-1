/*
 *
 * Wallet actions
 *
 */

import {CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAIL} from './constants';

export function createPaymentRequestAction(id) {
  return {
    type: CREATE_PAYMENT_REQUEST,
    id
  };
}

export function createPaymentSuccessAction(data) {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    data
  };
}

export function createPaymentFailAction(error) {
  return {
    type: CREATE_PAYMENT_FAIL,
    error
  };
}
