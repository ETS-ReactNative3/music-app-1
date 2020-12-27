/*
 *
 * Tastemaker reducer
 *
 */
import produce from 'immer';
import { GET_TASTEMAKERS_REQUEST_SUCCESS } from './constants';

export const initialState = {
  influencers: [],
};

/* eslint-disable default-case, no-param-reassign */
const tastemakerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TASTEMAKERS_REQUEST_SUCCESS:
        draft.influencers = action.data.data;
        break;
    }
  });

export default tastemakerReducer;
