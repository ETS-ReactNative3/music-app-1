/*
 *
 * Wallet actions
 *
 */

import { CREATE_PAYMENT } from './constants';

export function createPaymentAction(data) {
  return {
    type: CREATE_PAYMENT,
    data
  };
}
