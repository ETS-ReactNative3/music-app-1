/*
 *
 * Earnings reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  loading: false,
  songs: [],
  supportedLoader: false,
  supportedUserCount: 0,
  streamLoader: false,
  perStreamCost: 0,
  userCentricCost: 0,
  userCentricLoader: false,
};

/* eslint-disable default-case, no-param-reassign */
const earningsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_SONGS_STATS:
        draft.loading = true;
        break;
      case GET_SONGS_STATS_SUCCESS:
        draft.loading = false;
        draft.songs = action.songs;
        break;
      case GET_SONGS_STATS_FAILURE:
        draft.loading = false;
        break;
      case GET_MY_SUPPORTED_ARTISTS:
        draft.supportedLoader = true;
        break;
      case GET_MY_SUPPORTED_ARTISTS_SUCCESS:
        draft.supportedLoader = false;
        draft.supportedUserCount = action.count;
        break;
      case GET_MY_SUPPORTED_ARTISTS_FAILURE:
        draft.supportedLoader = false;
        break;
      case GET_PER_STREAM_COST:
        draft.streamLoader = true;
        break;
      case GET_PER_STREAM_COST_SUCCESS:
        draft.streamLoader = false;
        draft.perStreamCost = action.cost;
        break;
      case GET_PER_STREAM_COST_FAILURE:
        draft.streamLoader = false;
        break;
      case GET_USER_CENTRIC_COST:
        draft.userCentricLoader = true;
        break;
      case GET_USER_CENTRIC_COST_SUCCESS:
        draft.userCentricLoader = false;
        draft.userCentricCost = action.cost;
        break;
      case GET_USER_CENTRIC_COST_FAILURE:
        draft.userCentricLoader = false;
        break;
    }
  });

export default earningsReducer;
