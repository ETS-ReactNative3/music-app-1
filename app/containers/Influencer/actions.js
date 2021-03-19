/*
 *
 * Influencer actions
 *
 */

import {
  BECOME_AN_INFLUENCER,
  BECOME_AN_INFLUENCER_SUCCESS,
  BECOME_AN_INFLUENCER_FAIL,
  GET_SOCIAL_CHANNELS,
  GET_SOCIAL_CHANNELS_FAIL,
  GET_SOCIAL_CHANNELS_SUCCESS,
  GET_GENRES,
  GET_GENRES_SUCCESS,
  GET_GENRES_FAIL,
  GET_INFLUENCER_PROFILE,
  GET_INFLUENCER_PROFILE_SUCCESS,
  GET_INFLUENCER_PROFILE_FAIL,
  GET_INFLUENCER_REQUESTS,
  GET_INFLUENCER_REQUESTS_SUCCESS,
  GET_INFLUENCER_REQUESTS_FAIL,
  UPDATE_INFLUENCER_STATUS_REQUEST,
  UPDATE_INFLUENCER_STATUS_SUCCESS,
  UPDATE_INFLUENCER_STATUS_FAIL,
  FETCH_INFLUENCER_STATS,
  SAVE_INFLUENCER_STATS,
} from './constants';

export function becomeAnInfluencer(data) {
  return {
    type: BECOME_AN_INFLUENCER,
    data,
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
    error,
  };
}

export function getSocialChannelsRequest() {
  return {
    type: GET_SOCIAL_CHANNELS,
  };
}

export function getSocialChannelsRequestSuccess(data) {
  return {
    type: GET_SOCIAL_CHANNELS_SUCCESS,
    data,
  };
}

export function getSocialChannelsRequestFail(error) {
  return {
    type: GET_SOCIAL_CHANNELS_FAIL,
    error,
  };
}

export function getGenres() {
  return {
    type: GET_GENRES,
  };
}

export function getGenresSuccess(genres) {
  return {
    type: GET_GENRES_SUCCESS,
    genres,
  };
}

export function getGenresFail(error) {
  return {
    type: GET_GENRES_FAIL,
    error,
  };
}

export function getInfluencerProfile() {
  return {
    type: GET_INFLUENCER_PROFILE,
  };
}

export function getInfluencerProfileSuccess(profile) {
  return {
    type: GET_INFLUENCER_PROFILE_SUCCESS,
    profile,
  };
}

export function getInfluencerProfileFail(error) {
  return {
    type: GET_INFLUENCER_PROFILE_FAIL,
    error,
  };
}

export function getInfluencerRequests() {
  return {
    type: GET_INFLUENCER_REQUESTS,
  };
}

export function getInfluencerRequestsSuccess(requests) {
  return {
    type: GET_INFLUENCER_REQUESTS_SUCCESS,
    requests,
  };
}

export function getInfluencerRequestsFail(error) {
  return {
    type: GET_INFLUENCER_REQUESTS_FAIL,
    error,
  };
}

export function updateInfluencerStatus(data) {
  return {
    type: UPDATE_INFLUENCER_STATUS_REQUEST,
    data,
  };
}

export function updateInfluencerStatusSuccess() {
  return {
    type: UPDATE_INFLUENCER_STATUS_SUCCESS,
  };
}

export function updateInfluencerStatusFail(error) {
  return {
    type: UPDATE_INFLUENCER_STATUS_FAIL,
    error,
  };
}

export function fetchInfluencerStatsAction(id) {
  return {
    type: FETCH_INFLUENCER_STATS,
    id
  }
}

export function saveInfluencerStatsAction(influencerStats) {
  return {
    type: SAVE_INFLUENCER_STATS,
    influencerStats
  }
} 