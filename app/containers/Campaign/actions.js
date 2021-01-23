/*
 *
 * Tastemaker actions
 *
 */

import {
  FETCH_CAMPAIGN,
  LAUNCH_CAMPAIGN,
  SELECT_CAMPAIGN,
  PUT_CAMPAIGN,
  VERIFY_CAMPAIGN,
  ADD_INFLUENCER_RATING,
  ADD_INFLUENCER_REVIEW,
  REVIEW_SUBMITTING,
  RATING_SUBMITTING,
  VERIFY_SUBMITTING,
} from './constants';

export function launchCampaignAction(data) {
  return {
    type: LAUNCH_CAMPAIGN,
    data,
  };
}

export function fetchCampaignAction() {
  return {
    type: FETCH_CAMPAIGN,
  };
}

export function putCampaignAction(data) {
  return {
    type: PUT_CAMPAIGN,
    data,
  };
}

export function getSelectedCampaignAction(id) {
  return {
    type: SELECT_CAMPAIGN,
    id,
  };
}

export function verifyCampaignAction(data) {
  return {
    type: VERIFY_CAMPAIGN,
    data,
  };
}

export function addInfluencerRatingAction(data) {
  return {
    type: ADD_INFLUENCER_RATING,
    data,
  };
}

export function addInfluencerReviewAction(data) {
  return {
    type: ADD_INFLUENCER_REVIEW,
    data,
  };
}

export function reviewSubmittingAction(flag) {
  return {
    type: REVIEW_SUBMITTING,
    flag,
  };
}

export function ratingSubmittingAction(flag) {
  return {
    type: RATING_SUBMITTING,
    flag,
  };
}

export function verifySubmittingAction(flag) {
  return {
    type: VERIFY_SUBMITTING,
    flag,
  };
}
