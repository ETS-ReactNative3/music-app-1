import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectWalletDomain = state => state.wallet || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Wallet
 */

const makeSelectWallet = () =>
  createSelector(
    selectWalletDomain,
    substate => substate,
  );

const makeSelectPaymentHistory = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.paymentHistory,
  );

const makeSelectLoader = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.loader,
  );

const makeSelectPaymentMethods = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.paymentMethods,
  );

export {selectWalletDomain, makeSelectPaymentHistory, makeSelectLoader, makeSelectPaymentMethods, makeSelectWallet};
