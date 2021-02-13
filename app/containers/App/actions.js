/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  SET_PLAYLIST,
  HANDLE_SONG_PLAYING,
  HANDLE_SINGLE_SONG,
  SET_ROLE,
  PREPARE_APP,
  SET_SONGS,
  SET_LOADER,
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
} from './constants';

export function setPlaylist(songs) {
  return {
    type: SET_PLAYLIST,
    songs,
  };
}

export function handleSongPlaying(playing) {
  return {
    type: HANDLE_SONG_PLAYING,
    playing,
  };
}

export function handleSingleSong(songId, status) {
  return {
    type: HANDLE_SINGLE_SONG,
    songId,
    status,
  };
}

export function setRole(role) {
  return {
    type: SET_ROLE,
    role,
  };
}

export function prepareApp() {
  return {
    type: PREPARE_APP,
  };
}

export function setSongs(songs) {
  return {
    type: SET_SONGS,
    songs,
  };
}

export function setLoader(status) {
  return {
    type: SET_LOADER,
    status,
  };
}

export function getUserDetails() {
  return {
    type: GET_USER_DETAILS,
  };
}

export function getUserDetailsSuccess(userInformation) {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    userInformation,
  };
}

export function getUserDetailsFail(error) {
  return {
    type: GET_USER_DETAILS_ERROR,
    error,
  };
}
