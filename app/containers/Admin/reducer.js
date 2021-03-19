/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import { saveUsersCountAction } from './action';
import { SAVE_ALBUMS, SAVE_ALBUMS_COUNT, SAVE_USERS, SAVE_USERS_COUNT } from "./contant";

export const initialState = {
  loading: false,
  featuredAlbums: [],
  users: [],
  userCount: 0,
  albumCount: 0,
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_ALBUMS:
        draft.featuredAlbums = action.albums;
        break;
      case SAVE_USERS:
        draft.users = action.users;
        break;
      case SAVE_USERS_COUNT:
        draft.userCount = action.userCount;
        break;
      case SAVE_ALBUMS_COUNT:
        draft.albumCount = action.albumCount;
        break;
    }
  });

export default adminReducer;
