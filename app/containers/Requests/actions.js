import {
  FETCH_REQUESTS,
  PUT_REQUESTS,
  SUBMIT_REQUEST_FEEDBACK,
  SUBMIT_REQUEST_SOCAIL_LINKS,
  UPDATE_CAMPAIGN_STATUS,
} from './constants';

export function fetchRequestsAction() {
  return {
    type: FETCH_REQUESTS,
  };
}

export function putRequestAction(requests) {
  return {
    type: PUT_REQUESTS,
    requests,
  };
}

export function updateCampaignStatusAction(campaignId, statusId,updateCampaigns) {
  return {
    type: UPDATE_CAMPAIGN_STATUS,
    campaignId,
    statusId,
    updateCampaigns
  };
}

export function submitFeedbackRequestAction(
  campaignId,
  influencerId,
  feedback,
  declined,
  artistId
) {
  return {
    type: SUBMIT_REQUEST_FEEDBACK,
    campaignId,
    influencerId,
    feedback,
    declined,
    artistId
  };
}

export function submitSocialLinksAction(data) {
  return {
    type: SUBMIT_REQUEST_SOCAIL_LINKS,
    data,
  };
}
