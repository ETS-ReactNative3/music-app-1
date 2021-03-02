/*
 *
 * Library reducer
 *
 */
import produce from 'immer';
import { SAVE_FOLLOWED_ALBUMS, SAVE_FOLLOWED_ARTIST,FETCH_FOLLOWED_ALBUMS } from './constants';
export const initialState = {
  loading: false,
  followedArtist: [],
  followedAlbums: [],
};

/* eslint-disable default-case, no-param-reassign */
const libraryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_FOLLOWED_ALBUMS:
        draft.loading = true;
        break;
      case SAVE_FOLLOWED_ALBUMS:
        draft.followedAlbums = action.followedAlbums;
        draft.loading = false;
        break;

      case SAVE_FOLLOWED_ARTIST:
        draft.followedArtist = action.followedArtist;
        break;

    }
  });

export default libraryReducer;
