/*
 *
 * Influencer actions
 *
 */

import { BECOME_AN_INFLUENCER,BECOME_AN_INFLUENCER_SUCCESS,BECOME_AN_INFLUENCER_FAIL } from './constants';

export function becomeAnInfluencer(data) {
  return {
    type: BECOME_AN_INFLUENCER,
    data
  };
}

export function becomeAnInfluencerSucces() {
  return {
    type: BECOME_AN_INFLUENCER_SUCCESS,
  };
}

export function becomeAnInfluencerFail(error) {
  return {
    type: BECOME_AN_INFLUENCER_FAIL,
    error
  };
}
