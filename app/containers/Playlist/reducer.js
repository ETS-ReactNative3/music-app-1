/*
 *
 * Playlist reducer
 *
 */
import produce from 'immer';
import {TOGGLE_PLAYLIST_POPUP, GET_MY_PLAYLISTS_SUCCESS} from './constants';

export const initialState = {
  modalState: false,
  playlists: []
};

/* eslint-disable default-case, no-param-reassign */
const playlistReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_PLAYLIST_POPUP:
        draft.modalState = action.status;
        break;
      case GET_MY_PLAYLISTS_SUCCESS:
        draft.playlists = action.playlists;
        break;
    }
  });

export default playlistReducer;
