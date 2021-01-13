/*
 *
 * Wallet actions
 *
 */

import { CREATE_PAYMENT, FETCH_PAYMENT_HISTORY, SAVE_PAYMENT_HISTORY } from './constants';

export function createPaymentAction(data) {
  return {
    type: CREATE_PAYMENT,
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
