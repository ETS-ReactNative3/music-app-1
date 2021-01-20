/*
 *
 * Tastemaker actions
 *
 */

import { FETCH_CAMPAIGN, LAUNCH_CAMPAIGN, PUT_CAMPAIGN } from './constants';


export function launchCampaignAction(data) {
  return {
    type: LAUNCH_CAMPAIGN,
    data,
  };
}

export function fetchCampaignAction() {
  return {
    type: FETCH_CAMPAIGN
  }
}

export function putCampaignAction(data) {
  return {
    type: PUT_CAMPAIGN,
    data
  }
}