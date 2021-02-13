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
  ADD_PAYMENT_METHOD_FAIL,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_SUCCESS,
  GET_PAYMENT_METHODS_FAIL,
  DELETE_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD_SUCCESS,
  DELETE_PAYMENT_METHOD_FAIL,
  SUBMIT_WITHDRAWAL_AMOUNT_REQUEST,
  SUBMIT_WITHDRAWAL_AMOUNT_SUCCESS,
  SUBMIT_WITHDRAWAL_AMOUNT_FAIL,
  GET_WITHDRAWAL_REQUESTS_SUCCESS,
  GET_WITHDRAWAL_REQUESTS,
  GET_WITHDRAWAL_REQUESTS_FAIL,
  GET_EARNINGS, GET_EARNINGS_SUCCESS, GET_EARNINGS_FAIL
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

export function getPaymentMethodsAction() {
  return {
    type: GET_PAYMENT_METHODS
  };
}

export function getPaymentMethodsSuccessAction(methods) {
  return {
    type: GET_PAYMENT_METHODS_SUCCESS,
    methods
  };
}

export function getPaymentMethodsFailAction(error) {
  return {
    type: GET_PAYMENT_METHODS_FAIL,
    error
  };
}

export function deletePaymentMethodsAction(id) {
  return {
    type: DELETE_PAYMENT_METHOD,
    id
  };
}

export function deletePaymentMethodsSuccessAction() {
  return {
    type: DELETE_PAYMENT_METHOD_SUCCESS
  };
}

export function deletePaymentMethodsFailAction(error) {
  return {
    type: DELETE_PAYMENT_METHOD_FAIL,
    error
  };
}

export function submitWithdrawalAmountAction(data) {
  return {
    type: SUBMIT_WITHDRAWAL_AMOUNT_REQUEST,
    data
  };
}

export function submitWithdrawalAmountSuccessAction() {
  return {
    type: SUBMIT_WITHDRAWAL_AMOUNT_SUCCESS
  };
}

export function submitWithdrawalAmountFailAction(error) {
  return {
    type: SUBMIT_WITHDRAWAL_AMOUNT_FAIL,
    error
  };
}

export function getWithdrawalRequestsAction() {
  return {
    type: GET_WITHDRAWAL_REQUESTS
  };
}

export function getWithdrawalRequestsSuccessAction(requests) {
  return {
    type: GET_WITHDRAWAL_REQUESTS_SUCCESS,
    requests
  };
}

export function getWithdrawalRequestsFailAction(error) {
  return {
    type: GET_WITHDRAWAL_REQUESTS_FAIL,
    error
  };
}

export function getEarningsAction() {
  return {
    type: GET_EARNINGS
  };
}

export function getEarningsSuccessAction(data) {
  return {
    type: GET_EARNINGS_SUCCESS,
    data
  };
}

export function getEarningsFailAction(error) {
  return {
    type: GET_EARNINGS_FAIL,
    error
  };
}
