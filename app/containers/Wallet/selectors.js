import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectWalletDomain = state => state.wallet || initialState;

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

const makeSelectRequestButtonLoader = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.requestButtonLoader,
  );

const makeSelectWithdrawalRequests = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.withdrawalRequests,
  );

const makeSelectEarnings = () =>
  createSelector(
    selectWalletDomain,
    substate => substate.earnings,
  );

export {
  selectWalletDomain,
  makeSelectPaymentHistory,
  makeSelectLoader,
  makeSelectPaymentMethods,
  makeSelectWallet,
  makeSelectRequestButtonLoader,
  makeSelectWithdrawalRequests,
  makeSelectEarnings
};
