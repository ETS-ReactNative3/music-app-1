import produce from "immer";
import {HANDLE_SONG_PLAYING} from "./constants";
import {loadState} from "../../localstorage";


let initialState
const persistedTodosString = loadState()
if (persistedTodosString) {
  initialState = persistedTodosString.metaInformation
} else {
  initialState = {
    songCount: 0
  }
}

const metaInformationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HANDLE_SONG_PLAYING:
        draft.songCount = draft.songCount + 1;
        break;
    }
  })

export default metaInformationReducer
