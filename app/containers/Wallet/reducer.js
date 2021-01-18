/*
 *
 * Wallet reducer
 *
 */
import produce from 'immer';
import {SAVE_PAYMENT_HISTORY} from './constants';

export const initialState = {
  paymentHistory: []
};

/* eslint-disable default-case, no-param-reassign */
const walletReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SAVE_PAYMENT_HISTORY:
        draft.paymentHistory = action.data;
        break;
    }
  });

export default walletReducer;
