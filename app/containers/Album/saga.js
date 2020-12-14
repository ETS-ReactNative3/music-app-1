// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import {
  DELETE_ALBUM,
  GET_ALBUM,
  GET_MY_ALBUMS_REQUEST,
  GET_SONGS_REQUEST,
  LOAD_ALBUM,
  POST_ALBUMS_REQUEST, UPDATE_ALBUM
} from './constants';
import api from '../../utils/api';
import {
  deleteAlbumFail,
  deleteAlbumSuccess,
  getAlbumFail,
  getAlbumSuccess, getMyAlbumsRequest,
  getMyAlbumsRequestFail,
  getMyAlbumsRequestSuccess,
  loadAlbumFail,
  loadAlbumSuccess,
  postAlbumRequestFail,
  postAlbumRequestSuccess,
  songRequestFail,
  songRequestSuccess, updateAlbumFail, updateAlbumSuccess
} from './actions';

import history from '../../utils/history';
import {setPlaylist} from "../App/actions";

function getAlbumInfo(albumSlug) {
  return api.get(`/albums/songs/slug/${albumSlug}`);
}

function fetchMyAlbums() {
  return api.get('/albums/myAlbums');
}

function postAlbum(data) {
  return api.request({
    method: 'post',
    url: '/albums',
    data
  });
}

function editAlbum(data) {
  return api.put('/albums', data);
}

function postAlbumImage(data) {
  const imageData = new FormData();
  imageData.append('photo', data.albumImage[0]);
  return api.post(
    '/albums/upload',
    imageData,
  );
}

function getSongsApi() {
  return api.get('/songs');
}

function getAlbum(id) {
  return api.get(`/albums/${id}`);
}

function deleteAlbumApi(id) {
  return api.delete(`/albums/${id}`);
}

export function* fetchSongs() {
  try {
    const result = yield call(getSongsApi);
    yield put(songRequestSuccess(result.data));
  } catch (e) {
    yield put(songRequestFail(e.message));
  }
}

export function* albumSaga(action) {
  try {
    const result = yield call(getAlbumInfo, action.slug);
    yield put(loadAlbumSuccess(result.data));
    if (result.data && result.data.albumSongs.length > 0) {
      yield put(setPlaylist(result.data.albumSongs));
    }
  } catch (e) {
    yield put(loadAlbumFail(e.message));
  }
}

export function* myAlbumsSaga() {
  try {
    const result = yield call(fetchMyAlbums);
    yield put(getMyAlbumsRequestSuccess(result.data));
  } catch (e) {
    yield put(getMyAlbumsRequestFail(e.message));
  }
}

export function* saveAlbumSaga({ data }) {
  try {
    const result = yield call(postAlbumImage, data);
    const albumData = { ...data, artwork: result.data.location, imageKey: result.data.imageKey };
    const response = yield call(postAlbum, albumData);
    yield put(postAlbumRequestSuccess());
    history.push('/albumList');
  } catch (e) {
    yield put(postAlbumRequestFail(e.message));
  }
}

export function* getEditAlbum({ id }) {
  try {
    const result = yield call(getAlbum, id);
    yield put(getAlbumSuccess(result.data));
  } catch (e) {
    yield put(getAlbumFail(e.message));
  }
}

export function* deleteAlbum({ id }) {
  try {
    const result = yield call(deleteAlbumApi, id);
    yield put(getMyAlbumsRequest());
    yield put(deleteAlbumSuccess(result.data));
  } catch (e) {
    yield put(deleteAlbumFail(e.message));
  }
}

export function* updateAlbum({ data }) {
  console.log(data)
  try {
    const result = yield call(editAlbum, data);
    yield put(updateAlbumSuccess(result.data));
    history.push('/albumList');
  } catch (e) {
    yield put(updateAlbumFail(e.message));
  }
}

export default function* watchAlbum() {
  yield takeLatest(LOAD_ALBUM, albumSaga);
  yield takeLatest(GET_MY_ALBUMS_REQUEST, myAlbumsSaga);
  yield takeLatest(POST_ALBUMS_REQUEST, saveAlbumSaga);
  yield takeLatest(GET_SONGS_REQUEST, fetchSongs);
  yield takeLatest(GET_ALBUM, getEditAlbum);
  yield takeLatest(DELETE_ALBUM, deleteAlbum);
  yield takeLatest(UPDATE_ALBUM, updateAlbum);
}