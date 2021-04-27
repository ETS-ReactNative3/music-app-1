import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectPatronDomain = state => state.patron || initialState;


const makeSelectStakes = () =>
createSelector(
  selectPatronDomain,
  substate => substate.stakes,
);

const makeSelectProgress = () =>
createSelector(
  selectPatronDomain,
  substate => substate.progress,
);
export {
  makeSelectStakes,
  makeSelectProgress
};
