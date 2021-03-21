/*
 *
 * Browse reducer
 *
 */
import produce from 'immer';
import { FETCH_BROWSE_DATA, ON_ERROR_BROWSE_DATA, SAVE_BROWSE_DATA } from './constants';


export const initialState = {
    loading: false,
    browseData: {
        genres: [],
        moods: []
    }
};

/* eslint-disable default-case, no-param-reassign */
const browseReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case FETCH_BROWSE_DATA:
                draft.loading = true;
                draft.browseData = initialState.browseData;
                break;
            case SAVE_BROWSE_DATA:
                draft.loading = false;
                draft.browseData.genres = action.browseData.genres || [];
                draft.browseData.moods = action.browseData.moods || [];
                break;
            case ON_ERROR_BROWSE_DATA:
                draft.loading = false;
                break;
        }
    });

export default browseReducer;
