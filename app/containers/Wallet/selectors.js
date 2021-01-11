import { createSelector } from 'reselect';
import { initialState } from './reducer';

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

export default makeSelectWallet;
export { selectWalletDomain };
