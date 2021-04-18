/*
 *
 * Earnings actions
 *
 */

import {
  GET_SONGS_STATS,
  GET_SONGS_STATS_SUCCESS,
  GET_SONGS_STATS_FAILURE,
  GET_MY_SUPPORTED_ARTISTS,
  GET_MY_SUPPORTED_ARTISTS_SUCCESS,
  GET_MY_SUPPORTED_ARTISTS_FAILURE,
  GET_PER_STREAM_COST,
  GET_PER_STREAM_COST_SUCCESS,
  GET_PER_STREAM_COST_FAILURE,
  GET_USER_CENTRIC_COST,
  GET_USER_CENTRIC_COST_SUCCESS,
  GET_USER_CENTRIC_COST_FAILURE
} from './constants';

export function getSongsStats() {
  return {
    type: GET_SONGS_STATS,
  };
}

export function getSongsStatsSuccess(songs) {
  return {
    type: GET_SONGS_STATS_SUCCESS,
    songs
  };
}

export function getSongsStatsFailure(error) {
  return {
    type: GET_SONGS_STATS_FAILURE,
    error
  };
}

export function getMySupportedArtists() {
  return {
    type: GET_MY_SUPPORTED_ARTISTS,
  };
}

export function getMySupportedArtistsSuccess(count) {
  return {
    type: GET_MY_SUPPORTED_ARTISTS_SUCCESS,
    count
  };
}

export function getMySupportedArtistsFailure(error) {
  return {
    type: GET_MY_SUPPORTED_ARTISTS_FAILURE,
    error
  };
}

export function getPerStreamCost() {
  return {
    type: GET_PER_STREAM_COST,
  };
}

export function getPerStreamCostSuccess(cost) {
  return {
    type: GET_PER_STREAM_COST_SUCCESS,
    cost
  };
}

export function getPerStreamCostFailure(error) {
  return {
    type: GET_PER_STREAM_COST_FAILURE,
    error
  };
}

export function getUserCentricCost() {
  return {
    type: GET_USER_CENTRIC_COST,
  };
}

export function getUserCentricCostSuccess(cost) {
  return {
    type: GET_USER_CENTRIC_COST_SUCCESS,
    cost
  };
}

export function getUserCentricCostFailure(error) {
  return {
    type: GET_USER_CENTRIC_COST_FAILURE,
    error
  };
}
