/*
 *
 * Song reducer
 *
 */

import produce from 'immer';
import {
  GET_SONGS_REQUEST,
  GET_SONGS_REQUEST_FAIL,
  GET_SONGS_REQUEST_SUCCESS,
  UPLOAD_SONG_REQUEST,
  UPLOAD_SONG_SUCCESS,
  UPLOAD_SONG_FAILURE,
  GET_SONG_REQUEST,
  GET_SONG_REQUEST_SUCCESS,
  GET_SONG_REQUEST_FAIL,
  POST_SONG_REQUEST,
  POST_SONG_REQUEST_SUCCESS,
  POST_SONG_REQUEST_FAIL,
  UPDATE_SONG_REQUEST_FAIL,
  UPDATE_SONG_REQUEST,
  UPDATE_SONG_REQUEST_SUCCESS,
  GET_GENRES_SUCCESS,
} from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  songs: [],
  songData: null,
  songFormLoading: false,
  song: null,
  genres: [],
};

/* eslint-disable default-case, no-param-reassign */
const songReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_SONGS_REQUEST:
        draft.isLoading = true;
        break;
      case GET_SONGS_REQUEST_SUCCESS:
        draft.isLoading = false;
        draft.songs = action.songs;
        break;
      case GET_SONGS_REQUEST_FAIL:
      case GET_SONG_REQUEST_FAIL:
      case POST_SONG_REQUEST_FAIL:
      case UPDATE_SONG_REQUEST_FAIL:
        draft.isLoading = false;
        draft.error = action.error;
        break;
      case UPLOAD_SONG_REQUEST:
        draft.songData = action.songData;
        draft.songFormLoading = true;
        break;
      case UPLOAD_SONG_SUCCESS:
      case UPDATE_SONG_REQUEST_SUCCESS:
        draft.songFormLoading = false;
        break;
      case UPLOAD_SONG_FAILURE:
        draft.songFormLoading = false;
        break;
      case GET_SONG_REQUEST:
        draft.isLoading = true;
        break;
      case GET_SONG_REQUEST_SUCCESS:
        draft.isLoading = false;
        draft.song = action.song;
        break;
      case POST_SONG_REQUEST:
      case UPDATE_SONG_REQUEST:
        draft.songFormLoading = true;
        break;
      case POST_SONG_REQUEST_SUCCESS:
        draft.songFormLoading = false;
        break;
      case GET_GENRES_SUCCESS:
        draft.genres = action.genres;
        break;
    }
  });

export default songReducer;
