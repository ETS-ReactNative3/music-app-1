/*
 *
 * Tastemaker actions
 *
 */

import {
  GET_TASTEMAKERS_REQUEST,
  GET_TASTEMAKERS_REQUEST_SUCCESS,
  GET_TASTEMAKERS_REQUEST_FAIL,
  SELECT_INFLUENCER,
  REMOVE_INFLUENCER,
  RESET_SELECTED_INFLUENCER
} from './constants';

export function getTasteMakersRequest(data) {
  return {
    type: GET_TASTEMAKERS_REQUEST,
    data
  };
}

export function resetSelectedInfluencer() {
  return {
    type: RESET_SELECTED_INFLUENCER
  };
}

export function getTasteMakersRequestSuccess(data) {
  return {
    type: GET_TASTEMAKERS_REQUEST_SUCCESS,
    data,
  };
}

export function getTasteMakersRequestFail(error) {
  return {
    type: GET_TASTEMAKERS_REQUEST_FAIL,
    error,
  };
}


export function selectInfluencerAction(data) {
  return {
    type: SELECT_INFLUENCER,
    data,
  };
}

export function removeInfluencerAction(data) {
  return {
    type: REMOVE_INFLUENCER,
    data,
  };
}
