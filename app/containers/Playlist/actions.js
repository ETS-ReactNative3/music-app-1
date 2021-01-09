/*
 *
 * Playlist actions
 *
 */

import {
  CREATE_PLAYLIST_REQUEST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAIL,
  DELETE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_FAIL,
  DELETE_PLAYLIST_SUCCESS,
  GET_PLAYLIST_REQUEST,
  GET_PLAYLIST_FAIL,
  GET_PLAYLIST_SUCCESS,
  TOGGLE_PLAYLIST_POPUP,
  GET_MY_PLAYLISTS_FAIL,
  GET_MY_PLAYLISTS_REQUEST,
  GET_MY_PLAYLISTS_SUCCESS,
  DELETE_SONG_PLAYLIST_REQUEST,
  DELETE_SONG_PLAYLIST_SUCCESS,
  DELETE_SONG_PLAYLIST_FAIL,
  ADD_SONG_INTO_PAYLIST,
  ADD_SONG_INTO_PAYLIST_SUCCESS,
  ADD_SONG_INTO_PAYLIST_FAIL,
  CREATE_PLAYLIST_AND_ADD_SONG,
  CREATE_PLAYLIST_AND_ADD_SONG_SUCCESS,
  CREATE_PLAYLIST_AND_ADD_SONG_FAIL,
  UPDATE_PLAYLIST_REQUEST,
  UPDATE_PLAYLIST_FAIL,
  UPDATE_PLAYLIST_SUCCESS
} from './constants';

export function createPlaylist(data) {
  return {
    type: CREATE_PLAYLIST_REQUEST,
    data,
  };
}

export function createPlaylistSuccess() {
  return {
    type: CREATE_PLAYLIST_SUCCESS,
  };
}

export function createPlaylistFail(error) {
  return {
    type: CREATE_PLAYLIST_FAIL,
    error,
  };
}

export function updatePlaylist(data) {
  return {
    type: UPDATE_PLAYLIST_REQUEST,
    data,
  };
}

export function updatePlaylistSuccess() {
  return {
    type: UPDATE_PLAYLIST_SUCCESS,
  };
}

export function updatePlaylistFail(error) {
  return {
    type: UPDATE_PLAYLIST_FAIL,
    error,
  };
}

export function getPlaylist(id) {
  return {
    type: GET_PLAYLIST_REQUEST,
    id,
  };
}

export function getPlaylistSuccess(playlist) {
  return {
    type: GET_PLAYLIST_SUCCESS,
    playlist,
  };
}

export function getPlaylistFail(error) {
  return {
    type: GET_PLAYLIST_FAIL,
    error,
  };
}

export function deletePlaylist(id) {
  return {
    type: DELETE_PLAYLIST_REQUEST,
    id,
  };
}

export function deletePlaylistSuccess() {
  return {
    type: DELETE_PLAYLIST_SUCCESS,
  };
}

export function deletePlaylistFail(error) {
  return {
    type: DELETE_PLAYLIST_FAIL,
    error,
  };
}

export function togglePlaylistPopup(status) {
  return {
    type: TOGGLE_PLAYLIST_POPUP,
    status,
  };
}

export function getMyPlaylist() {
  return {
    type: GET_MY_PLAYLISTS_REQUEST,
  };
}

export function getMyPlaylistSuccess(playlists) {
  return {
    type: GET_MY_PLAYLISTS_SUCCESS,
    playlists,
  };
}

export function getMyPlaylistFail(error) {
  return {
    type: GET_MY_PLAYLISTS_FAIL,
    error,
  };
}

export function deleteSong(id, songId) {
  return {
    type: DELETE_SONG_PLAYLIST_REQUEST,
    id,
    songId,
  };
}

export function deleteSongSuccess() {
  return {
    type: DELETE_SONG_PLAYLIST_SUCCESS,
  };
}

export function deleteSongFail(error) {
  return {
    type: DELETE_SONG_PLAYLIST_FAIL,
    error,
  };
}

export function addSongIntoPlaylist(data) {
  return {
    type: ADD_SONG_INTO_PAYLIST,
    data,
  };
}

export function addSongIntoPlaylistSuccess() {
  return {
    type: ADD_SONG_INTO_PAYLIST_SUCCESS,
  };
}

export function addSongIntoPlaylistFail(error) {
  return {
    type: ADD_SONG_INTO_PAYLIST_FAIL,
    error,
  };
}

export function createPlaylistandAddSong(data) {
  return {
    type: CREATE_PLAYLIST_AND_ADD_SONG,
    data,
  };
}

export function createPlaylistandAddSongSuccess() {
  return {
    type: CREATE_PLAYLIST_AND_ADD_SONG_SUCCESS,
  };
}

export function createPlaylistandAddSongFail(error) {
  return {
    type: CREATE_PLAYLIST_AND_ADD_SONG_FAIL,
    error,
  };
}
