/*
 *
 * Album reducer
 *
 */
import produce from 'immer';
import {
  PUT_ACTIVITIES,
  PUT_RATINGS,
  PUT_REVIEWS,
  UPDATE_INFLUENCER_PROCESSING,
  UPDATE_PROCESSING,
  SAVE_USERS_COUNTRIES
} from './constants';

export const initialState = {
  activities: [],
  reviews: [],
  ratings: null,
  ratingCount: null,
  updateProcessing: false,
  updateInfluencerProcessing: false,
  countries: []
};

/* eslint-disable default-case, no-param-reassign */
const accountReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUT_ACTIVITIES:
        draft.activities = action.activities;
        break;
      case PUT_REVIEWS:
        draft.reviews = action.reviews;
        break;
      case PUT_RATINGS:
        draft.ratings = action.ratings;
        draft.ratingCount = action.ratingCount;
        break;
      case UPDATE_PROCESSING:
        draft.updateProcessing = action.flag;
        break;
      case UPDATE_INFLUENCER_PROCESSING:
        draft.updateInfluencerProcessing = action.flag;
        break;
      case SAVE_USERS_COUNTRIES:
        draft.countries = action.countries;
        break;
    }
  });

export default accountReducer;
