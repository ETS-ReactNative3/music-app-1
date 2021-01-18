/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  GET_NEW_RELEASES,
  GET_NEW_RELEASES_FAIL,
  GET_NEW_RELEASES_SUCCESS,
  GET_TOP_SONGS_FAIL,
  GET_TOP_SONGS_SUCCESS,
  GET_TOP_SONGS,
  GET_FEATURED_ALBUMS_FAIL,
  GET_FEATURED_ALBUMS_SUCCESS,
  GET_FEATURED_ALBUMS
} from './constants';

// The initial state of the App
export const initialState = {
  newReleaseLoading: true,
  newReleases: [],
  featuredAlbumLoading: true,
  featuredAlbum: [],
  topSongsLoading: true,
  topSongs: [],
  error: null
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_NEW_RELEASES:
        draft.newReleaseLoading = true;
        break;
      case GET_NEW_RELEASES_SUCCESS:
        draft.newReleaseLoading = false;
        draft.newReleases = action.releases;
        break;
      case GET_NEW_RELEASES_FAIL:
        draft.newReleaseLoading = false;
        break;
      case GET_FEATURED_ALBUMS:
        draft.featuredAlbumLoading = true;
        break;
      case GET_FEATURED_ALBUMS_SUCCESS:
        draft.featuredAlbumLoading = false;
        draft.featuredAlbum = action.albums;
        break;
      case GET_FEATURED_ALBUMS_FAIL:
        draft.featuredAlbumLoading = false;
        break;
      case GET_TOP_SONGS:
        draft.topSongsLoading = true;
        break;
      case GET_TOP_SONGS_SUCCESS:
        draft.topSongsLoading = false;
        draft.topSongs = action.songs;
        break;
      case GET_TOP_SONGS_FAIL:
        draft.topSongsLoading = false;
        break;
    }
  });

export default homeReducer;
