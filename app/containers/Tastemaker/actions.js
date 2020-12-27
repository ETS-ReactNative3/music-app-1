/*
 *
 * Tastemaker actions
 *
 */

import {
  GET_TASTEMAKERS_REQUEST,
  GET_TASTEMAKERS_REQUEST_SUCCESS,
  GET_TASTEMAKERS_REQUEST_FAIL
} from './constants';

export function getTasteMakersRequest() {
  return {
    type: GET_TASTEMAKERS_REQUEST,
  };
}

export function getTasteMakersRequestSuccess(data) {
  return {
    type: GET_TASTEMAKERS_REQUEST_SUCCESS,
    data
  };
}

export function getTasteMakersRequestFail(error) {
  return {
    type: GET_TASTEMAKERS_REQUEST_FAIL,
    error
  };
}
