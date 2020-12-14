/*
 *
 * Album actions
 *
 */

import {
  LOAD_ALBUM,
  LOAD_ALBUM_SUCCESS,
  LOAD_ALBUM_FAIL,
  GET_MY_ALBUMS_REQUEST,
  GET_MY_ALBUMS_REQUEST_SUCCESS,
  GET_MY_ALBUMS_REQUEST_FAIL,
  POST_ALBUMS_REQUEST,
  POST_ALBUMS_REQUEST_SUCCESS,
  POST_ALBUMS_REQUEST_FAIL,
  GET_SONGS_REQUEST,
  GET_SONGS_REQUEST_SUCCESS,
  GET_SONGS_REQUEST_FAIL,
  GET_ALBUM,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAIL,
  DELETE_ALBUM,
  DELETE_ALBUM_SUCCESS,
  DELETE_ALBUM_FAIL,
  UPDATE_ALBUM,
  UPDATE_ALBUM_SUCCESS,
  UPDATE_ALBUM_FAIL,
} from './constants';

export function loadAlbum(slug) {
  return {
    type: LOAD_ALBUM,
    slug,
  };
}

export function loadAlbumSuccess(album) {
  return {
    type: LOAD_ALBUM_SUCCESS,
    album,
  };
}

export function loadAlbumFail(error) {
  return {
    type: LOAD_ALBUM_FAIL,
    error,
  };
}

export function getMyAlbumsRequest() {
  return {
    type: GET_MY_ALBUMS_REQUEST,
  };
}

export function getMyAlbumsRequestSuccess(albums) {
  return {
    type: GET_MY_ALBUMS_REQUEST_SUCCESS,
    albums,
  };
}

export function getMyAlbumsRequestFail(error) {
  return {
    type: GET_MY_ALBUMS_REQUEST_FAIL,
    error,
  };
}

export function postAlbumRequest(data) {
  return {
    type: POST_ALBUMS_REQUEST,
    data,
  };
}

export function postAlbumRequestSuccess() {
  return {
    type: POST_ALBUMS_REQUEST_SUCCESS,
  };
}

export function postAlbumRequestFail(error) {
  return {
    type: POST_ALBUMS_REQUEST_FAIL,
    error,
  };
}

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

export function getAlbum(id) {
  return {
    type: GET_ALBUM,
    id,
  };
}

export function getAlbumSuccess(album) {
  return {
    type: GET_ALBUM_SUCCESS,
    album,
  };
}

export function getAlbumFail(error) {
  return {
    type: GET_ALBUM_FAIL,
    error,
  };
}

export function deleteAlbum(id) {
  return {
    type: DELETE_ALBUM,
    id,
  };
}

export function deleteAlbumSuccess() {
  return {
    type: DELETE_ALBUM_SUCCESS,
  };
}

export function deleteAlbumFail(error) {
  return {
    type: DELETE_ALBUM_FAIL,
    error,
  };
}

export function updateAlbum(data) {
  console.log(data);
  return {
    type: UPDATE_ALBUM,
    data,
  };
}

export function updateAlbumSuccess() {
  return {
    type: UPDATE_ALBUM_SUCCESS,
  };
}

export function updateAlbumFail(error) {
  return {
    type: UPDATE_ALBUM_FAIL,
    error,
  };
}
