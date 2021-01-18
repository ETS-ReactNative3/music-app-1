/*
 *
 * Album reducer
 *
 */
import produce from 'immer';
import { PUT_REQUESTS } from './constants';

export const initialState = {
  requests: [],
};

/* eslint-disable default-case, no-param-reassign */
const requestReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PUT_REQUESTS:
        draft.requests = action.requests;
        break;
      
    }
  });

export default requestReducer;
