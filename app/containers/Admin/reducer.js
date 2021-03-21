/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import { saveUsersCountAction } from './action';
import { FETCH_DISPUTED_CAMPAIGNS, ON_ERROR_DISPUTED_CAMPAIGNS, SAVE_ALBUMS, SAVE_ALBUMS_COUNT, SAVE_DISPUTED_CAMPAIGNS, SAVE_USERS, SAVE_USERS_COUNT } from "./contant";

export const initialState = {
  loading: false,
  featuredAlbums: [],
  users: [],
  userCount: 0,
  albumCount: 0,
  disputedCampaigns: []
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
      case FETCH_DISPUTED_CAMPAIGNS:

        draft.loading = true;
        draft.disputedCampaigns = [];
        break;

      case SAVE_DISPUTED_CAMPAIGNS:
        draft.loading = false;
        draft.disputedCampaigns = action.disputedCampaigns;
        break;

      case ON_ERROR_DISPUTED_CAMPAIGNS:
        draft.loading = false;
        break;
    }
  });

export default adminReducer;
