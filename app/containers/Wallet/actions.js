/*
 *
 * Wallet actions
 *
 */
import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAIL,
  FETCH_PAYMENT_HISTORY,
  SAVE_PAYMENT_HISTORY
} from './constants';

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

export function fetchPaymentHistoryAction() {
  return {
    type: FETCH_PAYMENT_HISTORY,
  };
}


export function savePaymentHistoryAction(data) {
  return {
    type: SAVE_PAYMENT_HISTORY,
    data
  };
}

export function createPaymentFailAction(error) {
  return {
    type: CREATE_PAYMENT_FAIL,
    error
  };
}
