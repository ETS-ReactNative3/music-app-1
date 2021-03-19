/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SAVE_USERS, SAVE_USERS_COUNT } from './constant';

// The initial state of the App
export const initialState = {
  loading: false,
  users: [],
  userCount: 0
};

/* eslint-disable default-case, no-param-reassign */
const adminUsersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_USERS:
        draft.users = action.users;
        break;
      case SAVE_USERS_COUNT:
        draft.userCount = action.userCount;
        break;
    }
  });

export default adminUsersReducer;
