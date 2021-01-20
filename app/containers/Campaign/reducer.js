/*
 *
 * Tastemaker reducer
 *
 */
import produce from 'immer';
import { act } from 'react-testing-library';
import { PUT_CAMPAIGN } from './constants';

export const initialState = {
  campaigns: []
};

/* eslint-disable default-case, no-param-reassign */
const campaignReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUT_CAMPAIGN:
        draft.campaigns = action.data;
        break;

    }
  });

export default campaignReducer;
