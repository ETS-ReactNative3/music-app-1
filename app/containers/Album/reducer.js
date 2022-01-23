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
  GET_GENRES_SUCCESS,
  POST_ALBUMS_REQUEST,
  POST_ALBUMS_REQUEST_FAIL,
  POST_ALBUMS_REQUEST_SUCCESS,
  UPDATE_ALBUM,
  UPDATE_ALBUM_SUCCESS,
  UPDATE_ALBUM_FAIL,
  GET_RECOMMENDED_ALBUMS,
  GET_RECOMMENDED_ALBUMS_SUCCESS,
  GET_RECOMMENDED_ALBUMS_FAIL, CAST_VOTE_LOADING, CAST_VOTE_SUCCESS, CAST_VOTE
} from './constants';

export const initialState = {
  album: null,
  myAlbums: [],
  songs: [],
  loader: false,
  formLoader: false,
  error: null,
  genres: [],
  editAlbum: null,
  voteLoader: false
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
      case GET_GENRES_SUCCESS:
        draft.genres = action.genres;
        break;
      case POST_ALBUMS_REQUEST:
      case UPDATE_ALBUM:
        draft.formLoader = true;
        break;
      case POST_ALBUMS_REQUEST_SUCCESS:
      case POST_ALBUMS_REQUEST_FAIL:
      case UPDATE_ALBUM_SUCCESS:
      case UPDATE_ALBUM_FAIL:
        draft.formLoader = false;
        break;
      case CAST_VOTE_LOADING:
      case CAST_VOTE:
        draft.voteLoader = true;
        break;
      case CAST_VOTE_SUCCESS:
        draft.voteLoader = false;
        break;
    }
  });

export default albumReducer;
