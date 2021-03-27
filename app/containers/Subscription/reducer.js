/*
 *
 * Subscription reducer
 *
 */
import produce from 'immer';
import {GET_PLANS, GET_PLANS_SUCCESS} from './constants';

export const initialState = {
  loader: false,
  plans: null
};

/* eslint-disable default-case, no-param-reassign */
const subscriptionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_PLANS:
        draft.loader = true
        break;
      case GET_PLANS_SUCCESS:
        draft.loader = false
        draft.plans = action.plans
        break;
    }
  });

export default subscriptionReducer;
