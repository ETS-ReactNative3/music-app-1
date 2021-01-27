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
  UPDATE_PROCESSING,
} from './constants';

export const initialState = {
  activities: [],
  reviews: [],
  ratings: null,
  ratingCount: null,
  updateProcessing: false,
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
    }
  });

export default accountReducer;
