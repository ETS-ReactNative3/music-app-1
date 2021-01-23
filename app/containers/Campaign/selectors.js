import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tastemaker state domain
 */

const selectTastemakerDomain = state => state.campaign || initialState;

/**
 * Other specific selectors
 */

const makeSelectCampaigns = () =>
  createSelector(
    selectTastemakerDomain,
    substate => substate.campaigns,
  );

const makeSelectCampaign = () =>
  createSelector(
    selectTastemakerDomain,
    substate => substate.selectedCampaign,
  );

export {
  // makeSelectTastemaker,
  // makeSelectSelectedInfluencers,
  makeSelectCampaigns,
  makeSelectCampaign,
};
