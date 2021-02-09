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
  SAVE_PAYMENT_HISTORY,
  ADD_PAYMENT_METHOD,
  ADD_PAYMENT_METHOD_SUCCESS,
  ADD_PAYMENT_METHOD_FAIL
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

export function addPaymentMethodAction(methodData) {
  return {
    type: ADD_PAYMENT_METHOD,
    methodData
  };
}

export function addPaymentMethodSuccessAction() {
  return {
    type: ADD_PAYMENT_METHOD_SUCCESS
  };
}

export function addPaymentMethodFailAction(error) {
  return {
    type: ADD_PAYMENT_METHOD_FAIL,
    error
  };
}
