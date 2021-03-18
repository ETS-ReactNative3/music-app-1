/*
 *
 * Admin reducer
 *
 */
import produce from 'immer';
import {SAVE_ALBUMS} from "./contant";

export const initialState = {
  loading: false,
  featuredAlbums: [],
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_ALBUMS:
        draft.featuredAlbums = action.albums;
        break;
      
    }
  });

export default adminReducer;
