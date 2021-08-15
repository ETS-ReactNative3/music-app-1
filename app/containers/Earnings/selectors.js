import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the earnings state domain
 */

const selectEarningsDomain = state => state.earnings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Earnings
 */

const makeSelectEarningsLoading = () =>
  createSelector(
    selectEarningsDomain,
    substate => substate.loading,
  );

const makeSelectEarningsSongs = () =>
  createSelector(
    selectEarningsDomain,
    substate => substate.songs,
  );

const makeSelectEarningsSupportedUserCount = () =>
  createSelector(
    selectEarningsDomain,
    substate => substate.supportedUserCount,
  );

const makeSelectEarningsPerStreamCost = () =>
  createSelector(
    selectEarningsDomain,
    substate => substate.perStreamCost,
  );

const makeSelectEarningsUserCentricCost = () =>
  createSelector(
    selectEarningsDomain,
    substate => substate.userCentricCost,
  );


export {
  selectEarningsDomain,
  makeSelectEarningsLoading,
  makeSelectEarningsSongs,
  makeSelectEarningsSupportedUserCount,
  makeSelectEarningsPerStreamCost,
  makeSelectEarningsUserCentricCost
};
