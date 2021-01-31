/*
 *
 * Tastemaker reducer
 *
 */
import produce from 'immer';
import {
  PUT_CAMPAIGN,
  RATING_SUBMITTING,
  REVIEW_SUBMITTING,
  SELECT_CAMPAIGN,
  VERIFY_SUBMITTING,
  DECLINE_SUBMITTING
} from './constants';

export const initialState = {
  campaigns: [],
  selectedCampaign: {},
  reviewSubmitting: false,
  ratingSubmitting: false,
  verifySubmitting: false,
  declineSubmitting: false,
};

/* eslint-disable default-case, no-param-reassign */
const campaignReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUT_CAMPAIGN:
        draft.campaigns = action.data;
        break;
      case SELECT_CAMPAIGN:
        draft.selectedCampaign = action.id;
        break;
      case REVIEW_SUBMITTING:
        draft.reviewSubmitting = action.flag;
        break;
      case RATING_SUBMITTING:
        draft.ratingSubmitting = action.flag;
        break;
      case VERIFY_SUBMITTING:
        draft.verifySubmitting = action.flag;
        break;
      case DECLINE_SUBMITTING:
        draft.declineSubmitting = action.flag;
    }
  });

export default campaignReducer;
