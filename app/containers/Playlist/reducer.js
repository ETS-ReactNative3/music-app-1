/*
 *
 * Playlist reducer
 *
 */
import produce from 'immer';
import {
  TOGGLE_PLAYLIST_POPUP,
  GET_MY_PLAYLISTS_SUCCESS,
  GET_PLAYLIST_SUCCESS,
  GET_PLAYLIST_REQUEST,
  GET_PLAYLIST_FAIL, TOGGLE_UPDATE_PLAYLIST_POPUP,
} from './constants';

export const initialState = {
  addModalState: false,
  updateModalState: false,
  playlists: [],
  playlist: null,
  loader: false,
};

/* eslint-disable default-case, no-param-reassign */
const playlistReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_PLAYLIST_POPUP:
        draft.addModalState = action.status;
        break;
      case TOGGLE_UPDATE_PLAYLIST_POPUP:
        draft.updateModalState = action.updateModalStatus;
        break;
      case GET_MY_PLAYLISTS_SUCCESS:
        draft.playlists = action.playlists;
        break;
      case GET_PLAYLIST_REQUEST:
        draft.loader = true;
        break;
      case GET_PLAYLIST_SUCCESS:
        draft.playlist = action.playlist;
        break;
      case GET_PLAYLIST_FAIL:
        draft.loader = false;
        break;
    }
  });

export default playlistReducer;
