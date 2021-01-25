/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { GET_INFLUENCER_PROFILE_SUCCESS } from '../Influencer/constants';
import {
  SET_PLAYLIST,
  HANDLE_SONG_PLAYING,
  HANDLE_SINGLE_SONG,
  SET_ROLE,
  GET_GENRES_SUCCESS,
  SET_SONGS,
  SET_LOADER,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS,
  GET_USER_DETAILS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  userDetails: null,
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
  influencerProfile: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PLAYLIST:
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
        draft.loading = true;
        break;
      case GET_USER_DETAILS_SUCCESS:
        draft.userDetails = action.userInformation;
        draft.loading = false;
        break;
      case GET_USER_DETAILS_ERROR:
        draft.loading = false;
        break;
      case SET_LOADER:
        draft.loader = action.status;
        break;
      case GET_INFLUENCER_PROFILE_SUCCESS:
        draft.influencerProfile = action.profile;
        break;
    }
  });

export default appReducer;
