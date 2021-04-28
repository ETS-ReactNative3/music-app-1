/*
 *
 * Album reducer
 *
 */
import produce from 'immer';
import { FETCH_STAKE, SAVE_STAKE, SHOW_PROGRESS, CREATE_STAKE_PROGRESS, CREATE_STAKE } from './constants';

export const initialState = {
  stakes: [],
  progress: false,
  stakeProgress: false,
};

/* eslint-disable default-case, no-param-reassign */
const patronReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_STAKE:
        draft.stakes = action.stakes;
        break;
      case FETCH_STAKE:
        draft.progress = true;
        break;
      case SHOW_PROGRESS:
        draft.progress = action.flag;
        break;
      case CREATE_STAKE:
        draft.stakeProgress = true;
        break;
      case CREATE_STAKE_PROGRESS:
        draft.stakeProgress = action.flag;
        break;
    }
  });

export default patronReducer;
