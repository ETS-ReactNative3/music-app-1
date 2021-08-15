import {
  GET_SONGS_REQUEST,
  GET_SONGS_REQUEST_FAIL,
  GET_SONGS_REQUEST_SUCCESS,
  UPLOAD_SONG_REQUEST,
  UPLOAD_SONG_FAILURE,
  UPLOAD_SONG_SUCCESS,
  DELETE_SONG,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_FAILURE,
  GET_SONG_REQUEST,
  GET_SONG_REQUEST_SUCCESS,
  GET_SONG_REQUEST_FAIL,
  POST_SONG_REQUEST,
  POST_SONG_REQUEST_SUCCESS,
  POST_SONG_REQUEST_FAIL,
  UPDATE_SONG_REQUEST,
  UPDATE_SONG_REQUEST_SUCCESS,
  UPDATE_SONG_REQUEST_FAIL,
  GET_GENRES,
  GET_GENRES_SUCCESS,
  GET_GENRES_FAIL, SAVE_MOOD_LIST, GET_MOOD_LIST, GET_TEAM_MEMBERS, GET_TEAM_MEMBERS_SUCCESS, GET_TEAM_MEMBERS_FAIL
} from './constants';

export function songRequest() {
  return {
    type: GET_SONGS_REQUEST,
  };
}

export function songRequestSuccess(songs) {
  return {
    type: GET_SONGS_REQUEST_SUCCESS,
    songs,
  };
}

export function songRequestFail(error) {
  return {
    type: GET_SONGS_REQUEST_FAIL,
    error,
  };
}

export function uploadSongRequest(songData, id) {
  return {
    type: UPLOAD_SONG_REQUEST,
    songData,
    id,
  };
}

export function uploadSongSuccess() {
  return {
    type: UPLOAD_SONG_SUCCESS,
  };
}

export function uploadSongFailure() {
  return {
    type: UPLOAD_SONG_FAILURE,
  };
}

export function deleteSong(id) {
  return {
    type: DELETE_SONG,
    id,
  };
}

export function deleteSongSuccess() {
  return {
    type: DELETE_SONG_SUCCESS,
  };
}

export function deleteSongFail(error) {
  return {
    type: DELETE_SONG_FAILURE,
    error,
  };
}

export function getSongRequest(id) {
  return {
    type: GET_SONG_REQUEST,
    id,
  };
}

export function getSongRequestSuccess(song) {
  return {
    type: GET_SONG_REQUEST_SUCCESS,
    song,
  };
}

export function getSongRequestFail(error) {
  return {
    type: GET_SONG_REQUEST_FAIL,
    error,
  };
}

export function postSongRequest(data) {
  return {
    type: POST_SONG_REQUEST,
    data,
  };
}

export function postSongRequestSuccess() {
  return {
    type: POST_SONG_REQUEST_SUCCESS,
  };
}

export function postSongRequestFail(error) {
  return {
    type: POST_SONG_REQUEST_FAIL,
    error,
  };
}

export function updateSongRequest(data) {
  return {
    type: UPDATE_SONG_REQUEST,
    data,
  };
}

export function updateSongRequestSuccess() {
  return {
    type: UPDATE_SONG_REQUEST_SUCCESS,
  };
}

export function updateSongRequestFail(error) {
  return {
    type: UPDATE_SONG_REQUEST_FAIL,
    error,
  };
}

export function getGenres() {
  return {
    type: GET_GENRES,
  };
}

export function getGenresSuccess(genres) {
  return {
    type: GET_GENRES_SUCCESS,
    genres,
  };
}

export function getGenresFail(error) {
  return {
    type: GET_GENRES_FAIL,
    error,
  };
}

export function getMoodListAction() {
  return {
    type: GET_MOOD_LIST
  }
}

export function saveMoodListAction(moods) {
  return {
    type: SAVE_MOOD_LIST,
    moods
  }
}

export function getTeamMembers() {
  return {
    type: GET_TEAM_MEMBERS,
  };
}

export function getTeamMembersSuccess(members) {
  return {
    type: GET_TEAM_MEMBERS_SUCCESS,
    members,
  };
}

export function getTeamMembersFail(error) {
  return {
    type: GET_TEAM_MEMBERS_FAIL,
    error,
  };
}
