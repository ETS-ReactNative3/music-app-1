/*
 *
 * Tastemaker reducer
 *
 */
import produce from 'immer';
import { SAVE_FOLLOWED_ALBUMS, SAVE_FOLLOWED_ARTIST, SAVE_FOLLOWED_PLAYLIST } from './constants';
export const initialState = {

  followedArtist: [],
  followedAlbums: [],
  followedPlaylist: []
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

      case SAVE_FOLLOWED_PLAYLIST:
        draft.followedPlaylist = action.followedPlaylist;
        break;
    }
  });

export default libraryReducer;
