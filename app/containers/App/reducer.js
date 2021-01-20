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
  SET_PLAYLIST,
  LOAD_ALBUM_SUCCESS,
  LOAD_ALBUM,
  LOAD_ALBUM_FAIL,
  HANDLE_SONG_PLAYING,
  HANDLE_SINGLE_SONG,
  SET_ROLE,
  GET_GENRES_SUCCESS,
  SET_SONGS,
  SET_LOADER,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS,
  GET_USER_DETAILS_ERROR
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  userDetails: {},
  influencerDetails: {},
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
  role: '',
  genres: [],
  loader: false,
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
      case LOAD_ALBUM_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.albumInfo = action.albumInfo;
        draft.currentPlaylist = action.playlist;
        break;
      case SET_ROLE:
        draft.role = action.role;
        break;
      case GET_GENRES_SUCCESS:
        draft.genres = action.genres;
        break;
      case SET_SONGS:
        draft.currentPlaylist = action.songs;
        break;
      case GET_USER_DETAILS:
      case LOAD_ALBUM:
        draft.loading = true;
        break;
      case GET_USER_DETAILS_SUCCESS:
        draft.userDetails = action.userInformation;
        draft.loading = false;
        break;
      case GET_USER_DETAILS_ERROR:
      case LOAD_ALBUM_FAIL:
        draft.loading = false;
        break;
      case SET_LOADER:
        draft.loader = action.status;
        break;
    }
  });

export default appReducer;
