/*
 *
 * Wallet reducer
 *
 */
import produce from 'immer';
import { SHOW_PROGRESS, SAVE_TEAMS , FETCH_TEAMS} from './constants';


export const initialState = {
  teams: [],
  progress: false
};

/* eslint-disable default-case, no-param-reassign */
const teamReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_TEAMS:
        draft.progress = true;
        break;
      case SAVE_TEAMS:
        draft.teams = action.teams;
        draft.progress = false;
        break;
      case SHOW_PROGRESS:
        draft.progress = action.flag;
        break;
    }
  });

export default teamReducer;
