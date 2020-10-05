/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_DEFAULT_DATA_SUCCESS,
  SET_PLAYLIST,
  LOAD_ALBUM_SUCCESS,
  HANDLE_SONG_PLAYING,
  HANDLE_SINGLE_SONG,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  featuredAlbum: [],
  latestPosts: [],
  weeklyTop: [],
  newReleases: [],
  recommended: [],
  albumInfo: {},
  currentPlaylist: [],
  currentSong: {
    songIndex: 0,
    playing: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PLAYLIST:
        draft.loading = true;
        draft.error = false;
        draft.currentPlaylist = action.songs;
        break;

      case HANDLE_SONG_PLAYING:
        draft.loading = false;
        draft.currentSong.playing = action.playing;
        break;

      case HANDLE_SINGLE_SONG:
        draft.loading = false;
        draft.currentSong.songIndex = action.index;
        draft.currentSong.playing = action.status;
        break;

      case LOAD_DEFAULT_DATA_SUCCESS:
        draft.loading = true;
        draft.error = false;
        draft.latestPosts = action.posts;
        draft.featuredAlbum = action.albums;
        draft.weeklyTop = action.weeklyTop;
        draft.newReleases = action.albums;
        draft.recommended = action.recommendendJson;
        break;

      case LOAD_ALBUM_SUCCESS:
        draft.loading = true;
        draft.error = false;
        draft.albumInfo = action.albumInfo;
        draft.currentPlaylist = action.playlist;
        break;

      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
