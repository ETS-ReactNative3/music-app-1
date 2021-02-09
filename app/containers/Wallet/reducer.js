/*
 *
 * Wallet reducer
 *
 */
import produce from 'immer';
import {
  ADD_PAYMENT_METHOD, ADD_PAYMENT_METHOD_FAIL, ADD_PAYMENT_METHOD_SUCCESS,
  GET_PAYMENT_METHODS,
  GET_PAYMENT_METHODS_FAIL,
  GET_PAYMENT_METHODS_SUCCESS,
  SAVE_PAYMENT_HISTORY
} from './constants';

export const initialState = {
  paymentHistory: [],
  paymentMethods: [],
  loader: false,
  buttonLoader: false
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
    }
  });

export default walletReducer;
