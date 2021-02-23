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

const makeSelectLoader = () =>
  createSelector(
    selectInfluencerDomain,
    substate => substate.loading,
  );

const makeSelectGenres = () =>
  createSelector(
    selectInfluencerDomain,
    substate => substate.genres,
  );

const makeSelectSocialChannels = () =>
  createSelector(
    selectInfluencerDomain,
    substate => {
      return substate.socialChannels;
    },
  );

const makeSelectProfile = () =>
  createSelector(
    selectInfluencerDomain,
    substate => substate.profile,
  );

const makeSelectRequests = () =>
  createSelector(
    selectInfluencerDomain,
    substate => substate.influencers,
  );

export {
  makeSelectInfluencer,
  makeSelectFormLoader,
  makeSelectGenres,
  makeSelectSocialChannels,
  makeSelectProfile,
  makeSelectLoader,
  makeSelectRequests,
};
