/*
 *
 * Wallet reducer
 *
 */
import produce from 'immer';
import {
  ADD_PAYMENT_METHOD,
  ADD_PAYMENT_METHOD_FAIL,
  ADD_PAYMENT_METHOD_SUCCESS, GET_EARNINGS_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_FAIL,
  GET_PAYMENT_METHODS_SUCCESS,
  GET_WITHDRAWAL_REQUESTS_SUCCESS,
  SAVE_PAYMENT_HISTORY,
  SUBMIT_WITHDRAWAL_AMOUNT_FAIL,
  SUBMIT_WITHDRAWAL_AMOUNT_REQUEST,
  SUBMIT_WITHDRAWAL_AMOUNT_SUCCESS,
  GET_ALL_WITHDRAWAL_REQUESTS_SUCCESS
} from './constants';

export const initialState = {
  paymentHistory: [],
  paymentMethods: [],
  loader: false,
  buttonLoader: false,
  requestButtonLoader: false,
  withdrawalRequests: [],
  earnings: [],
  withdrawalList: []
};

/* eslint-disable default-case, no-param-reassign */
const walletReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SAVE_PAYMENT_HISTORY:
        draft.paymentHistory = action.data;
        break;
      case GET_PAYMENT_METHODS:
        draft.loader = true;
        break;
      case GET_PAYMENT_METHODS_SUCCESS:
        draft.paymentMethods = action.methods;
        draft.loader = false;
        break;
      case GET_PAYMENT_METHODS_FAIL:
        draft.loader = false;
        break;
      case ADD_PAYMENT_METHOD:
        draft.buttonLoader = true;
        break;
      case ADD_PAYMENT_METHOD_SUCCESS:
      case ADD_PAYMENT_METHOD_FAIL:
        draft.buttonLoader = false;
        break;
      case SUBMIT_WITHDRAWAL_AMOUNT_REQUEST:
        draft.requestButtonLoader = true;
        break;
      case SUBMIT_WITHDRAWAL_AMOUNT_SUCCESS:
      case SUBMIT_WITHDRAWAL_AMOUNT_FAIL:
        draft.requestButtonLoader = false;
        break;
      case GET_WITHDRAWAL_REQUESTS_SUCCESS:
        draft.withdrawalRequests = action.requests;
        break;
      case GET_EARNINGS_SUCCESS:
        draft.earnings = action.data;
        break;
      case GET_ALL_WITHDRAWAL_REQUESTS_SUCCESS:
        draft.withdrawalList = action.list;
        break;
    }
  });

export default walletReducer;
