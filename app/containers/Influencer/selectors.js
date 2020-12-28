import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the influencer state domain
 */

const selectInfluencerDomain = state => state.influencer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Influencer
 */

const makeSelectInfluencer = () =>
  createSelector(
    selectInfluencerDomain,
    substate => substate,
  );

const makeSelectFormLoader = () =>
  createSelector(
    selectInfluencerDomain,
    substate => substate.formLoader,
  );

export { makeSelectInfluencer, makeSelectFormLoader };
