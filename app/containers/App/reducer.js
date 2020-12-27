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
  LOAD_DEFAULT_DATA_SUCCESS,
  SET_PLAYLIST,
  LOAD_ALBUM_SUCCESS,
  HANDLE_SONG_PLAYING,
  HANDLE_SINGLE_SONG,
  SET_ROLE,
  GET_GENRES_SUCCESS, SET_SONGS,
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
  role: '',
  genres: [],
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
        draft.newReleases = action.latestReleases;
        draft.recommended = action.recommendendJson;
        break;
      case LOAD_ALBUM_SUCCESS:
        draft.loading = true;
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
    }
  });

export default appReducer;
