/*
 *
 * Library reducer
 *
 */
import produce from 'immer';
import { SAVE_FOLLOWED_ALBUMS, SAVE_FOLLOWED_ARTIST } from './constants';
export const initialState = {

  followedArtist: [],
  followedAlbums: [],
};

/* eslint-disable default-case, no-param-reassign */
const libraryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_FOLLOWED_ALBUMS:
        draft.followedAlbums = action.followedAlbums;
        break;

      case SAVE_FOLLOWED_ARTIST:
        draft.followedArtist = action.followedArtist;
        break;

    }
  });

export default libraryReducer;
