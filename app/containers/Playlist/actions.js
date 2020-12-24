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
  GET_MY_PLAYLISTS_SUCCESS
} from './constants';

export function createPlaylist(data) {
  return {
    type: CREATE_PLAYLIST_REQUEST,
    data
  };
}

export function createPlaylistSuccess() {
  return {
    type: CREATE_PLAYLIST_SUCCESS
  };
}

export function createPlaylistFail(error) {
  return {
    type: CREATE_PLAYLIST_FAIL,
    error
  };
}

export function getPlaylist(data) {
  return {
    type: GET_PLAYLIST_REQUEST,
    data
  };
}

export function getPlaylistSuccess() {
  return {
    type: GET_PLAYLIST_SUCCESS
  };
}

export function getPlaylistFail(error) {
  return {
    type: GET_PLAYLIST_FAIL,
    error
  };
}

export function deletePlaylist(id) {
  return {
    type: DELETE_PLAYLIST_REQUEST,
    id
  };
}

export function deletePlaylistSuccess() {
  return {
    type: DELETE_PLAYLIST_SUCCESS
  };
}

export function deletePlaylistFail(error) {
  return {
    type: DELETE_PLAYLIST_FAIL,
    error
  };
}

export function togglePlaylistPopup(status) {
  return {
    type: TOGGLE_PLAYLIST_POPUP,
    status
  }
}

export function getMyPlaylist() {
  return {
    type: GET_MY_PLAYLISTS_REQUEST
  };
}

export function getMyPlaylistSuccess(playlists) {
  return {
    type: GET_MY_PLAYLISTS_SUCCESS,
    playlists
  };
}

export function getMyPlaylistFail(error) {
  return {
    type: GET_MY_PLAYLISTS_FAIL,
    error
  };
}
