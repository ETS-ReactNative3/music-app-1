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
    substate => {
      return (
        (substate.campaigns &&
          substate.campaigns.find(
            campaign => campaign.id === Number(substate.selectedCampaign),
          )) ||
        {}
      )
    }
  );

const makeSelectReviewSubmitting = () =>
  createSelector(
    selectTastemakerDomain,
    substate => substate.reviewSubmitting,
  );

const makeSelectRatingSubmitting = () =>
  createSelector(
    selectTastemakerDomain,
    substate => substate.ratingSubmitting,
  );

const makeSelectVerifySubmitting = () =>
  createSelector(
    selectTastemakerDomain,
    substate => substate.verifySubmitting,
  );

  const makeSelectDeclineSubmitting = () =>
  createSelector(
    selectTastemakerDomain,
    substate => substate.declineSubmitting,
  );


export {
  makeSelectReviewSubmitting,
  makeSelectRatingSubmitting,
  makeSelectVerifySubmitting,
  makeSelectCampaigns,
  makeSelectCampaign,
  makeSelectDeclineSubmitting
};
