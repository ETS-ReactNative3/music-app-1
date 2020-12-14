/*
 *
 * Album reducer
 *
 */
import produce from 'immer';
import {
  LOAD_ALBUM,
  LOAD_ALBUM_FAIL,
  LOAD_ALBUM_SUCCESS,
  GET_MY_ALBUMS_REQUEST,
  GET_MY_ALBUMS_REQUEST_SUCCESS,
  GET_MY_ALBUMS_REQUEST_FAIL,
  GET_SONGS_REQUEST,
  GET_SONGS_REQUEST_SUCCESS,
  GET_SONGS_REQUEST_FAIL,
  GET_ALBUM,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAIL,
} from './constants';

export const initialState = {
  album: null,
  myAlbums: [],
  songs: [],
  loader: false,
  error: null,
  genres: [],
  editAlbum: null,
};

/* eslint-disable default-case, no-param-reassign */
const albumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ALBUM:
        draft.loader = true;
        break;
      case LOAD_ALBUM_SUCCESS:
        draft.loader = false;
        draft.album = action.album;
        break;
      case LOAD_ALBUM_FAIL:
      case GET_MY_ALBUMS_REQUEST_FAIL:
      case GET_SONGS_REQUEST_FAIL:
      case GET_ALBUM_FAIL:
        draft.loader = false;
        draft.error = action.error;
        break;
      case GET_MY_ALBUMS_REQUEST:
        draft.loader = true;
        break;
      case GET_MY_ALBUMS_REQUEST_SUCCESS:
        draft.loader = false;
        draft.myAlbums = action.albums;
        break;
      case GET_SONGS_REQUEST:
        draft.loader = true;
        break;
      case GET_SONGS_REQUEST_SUCCESS:
        draft.loader = false;
        draft.songs = action.songs;
        break;
      case GET_ALBUM:
        draft.loader = true;
        break;
      case GET_ALBUM_SUCCESS:
        draft.loader = false;
        draft.editAlbum = action.album;
        break;
    }
  });

export default albumReducer;
