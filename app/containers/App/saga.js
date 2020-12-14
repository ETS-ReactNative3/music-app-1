/**
 * Gets the default data to save in redux
 */

import { call, put, takeLatest, all } from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import {LOAD_DEFAULT_DATA, LOAD_ALBUM, GET_GENRES, SET_LOCAL_STORAGE_ROLE} from './constants';
import {defaultDataLoaded, getGenresFail, getGenresSuccess, loadAlbumSuccess, setRole} from './actions';
import request from '../../utils/request';
import api from '../../utils/api';

/**
 * Default Data request/response handler
 */
export function* getFeaturedAlbum() {
  try {
    const [posts, users, albums, photos] = yield all([
      call(request, 'https://jsonplaceholder.typicode.com/posts'),
      call(request, 'https://jsonplaceholder.typicode.com/users'),
      call(request, 'https://jsonplaceholder.typicode.com/albums'),
      call(request, 'https://jsonplaceholder.typicode.com/photos'),
    ]);
    yield put(defaultDataLoaded(posts, users, albums, photos));
  } catch (err) {
    // yield put(loadFeaturedAlbum([]));
  }
}

/**
 * Default Data request/response handler
 */
export function* getAlbumInfo(action) {
  const requestURL = `https://bliiink.ga/albums/songs/slug/${action.slug}`;
  try {
    const response = yield call(request, requestURL);
    console.log(response);
    const { albumSongs = [] } = response;
    const songs = albumSongs.map(ele => ele.song);
    yield put(loadAlbumSuccess(response, songs));
  } catch (err) {
    // yield put(loadFeaturedAlbum([]));
  }
}

function fetchGenres() {
  return api.get('/songs/genres');
}

export function* getGenresSaga() {
  try {
    console.log("ds")
    const result = yield call(fetchGenres);
    yield put(getGenresSuccess(result.data));
  } catch (e) {
    yield put(getGenresFail(e.message));
  }
}

export function* setLocalStorageRole() {
  const token = yield localStorage.getItem('token');
  const decoded = jwt_decode(token);
  yield put(setRole(decoded.role));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getFeaturedAlbumData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_DEFAULT_DATA, getFeaturedAlbum);
  yield takeLatest(LOAD_ALBUM, getAlbumInfo);
  yield takeLatest(SET_LOCAL_STORAGE_ROLE, setLocalStorageRole);
  yield takeLatest(GET_GENRES, getGenresSaga);
}
