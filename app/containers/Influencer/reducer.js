/*
 *
 * Influencer reducer
 *
 */
import produce from 'immer';
import {
  BECOME_AN_INFLUENCER,
  BECOME_AN_INFLUENCER_FAIL,
  BECOME_AN_INFLUENCER_SUCCESS,
  GET_SOCIAL_CHANNELS,
  GET_SOCIAL_CHANNELS_SUCCESS,
  GET_SOCIAL_CHANNELS_FAIL,
  GET_GENRES,
  GET_GENRES_SUCCESS,
  GET_GENRES_FAIL,
  GET_INFLUENCER_PROFILE,
  GET_INFLUENCER_PROFILE_SUCCESS,
  GET_INFLUENCER_PROFILE_FAIL,
  GET_INFLUENCER_REQUESTS,
  GET_INFLUENCER_REQUESTS_SUCCESS,
  GET_INFLUENCER_REQUESTS_FAIL,
} from './constants';

export const initialState = {
  loading: false,
  formLoader: false,
  error: null,
  socialChannels: [],
  genres: [],
  profile: null,
  influencers: null,
};

/* eslint-disable default-case, no-param-reassign */
const influencerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BECOME_AN_INFLUENCER:
        draft.formLoader = true;
        break;
      case BECOME_AN_INFLUENCER_SUCCESS:
        draft.formLoader = false;
        break;
      case BECOME_AN_INFLUENCER_FAIL:
        draft.formLoader = false;
        draft.error = action.error;
        break;
      case GET_SOCIAL_CHANNELS_FAIL:
      case GET_GENRES_FAIL:
      case GET_INFLUENCER_PROFILE_FAIL:
      case GET_INFLUENCER_REQUESTS_FAIL:
        draft.loading = false;
        draft.error = action.error;
        break;
      case GET_SOCIAL_CHANNELS:
      case GET_GENRES:
      case GET_INFLUENCER_PROFILE:
      case GET_INFLUENCER_REQUESTS:
        draft.loading = true;
        break;
      case GET_SOCIAL_CHANNELS_SUCCESS:
        draft.loading = false;
        draft.socialChannels = action.data;
        break;
      case GET_GENRES_SUCCESS:
        draft.loading = false;
        draft.genres = action.genres;
        break;
      case GET_INFLUENCER_PROFILE_SUCCESS:
        draft.profile = action.profile;
        break;
      case GET_INFLUENCER_REQUESTS_SUCCESS:
        draft.influencers = action.requests;
        draft.loading = false;
        break;
    }
  });

export default influencerReducer;
