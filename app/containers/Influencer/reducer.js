/*
 *
 * Influencer reducer
 *
 */
import produce from 'immer';
import { BECOME_AN_INFLUENCER, BECOME_AN_INFLUENCER_FAIL, BECOME_AN_INFLUENCER_SUCCESS, DEFAULT_ACTION } from './constants';

export const initialState = {
  formLoader: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const influencerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
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
    }
  });

export default influencerReducer;
