import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tastemaker state domain
 */

const selectTastemakerDomain = state => state.tastemaker || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tastemaker
 */

const makeSelectTastemaker = () =>
  createSelector(
    selectTastemakerDomain,
    substate => substate.influencers,
  );


export { makeSelectTastemaker };
