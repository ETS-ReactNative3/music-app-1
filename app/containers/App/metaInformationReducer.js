import produce from "immer";
import {HANDLE_SONG_PLAYING} from "./constants";
import {loadState} from "../../localstorage";

export let initialState = {
  songCount: 0
}
const persistedTodosString = loadState()
if (persistedTodosString && Object.keys(persistedTodosString).length !== 0) {
  initialState = persistedTodosString.metaInformation
}

const metaInformationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HANDLE_SONG_PLAYING:
        draft.songCount = draft.songCount + 1;
        break;
      default: // need this for default case
        return state
    }
  })

export default metaInformationReducer
