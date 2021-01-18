/**
 * Gets the default data to save in redux
 */

import {call, put, takeLatest} from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import {LOAD_ALBUM, PREPARE_APP, GET_USER_DETAILS} from './constants';
import {getUserDetailsFail, getUserDetailsSuccess, loadAlbumSuccess, setRole} from './actions';
import request from '../../utils/request';
import {axiosInstance} from '../../utils/api';

function fetchUserInformation() {
  return axiosInstance().get('/auth/userDetails');
}

/**
 * Default Data request/response handler
 */
export function* getAlbumInfo(action) {
  const requestURL = `https://bliiink.ga/albums/songs/slug/${action.slug}`;
  try {
    const response = yield call(request, requestURL);
    const {albumSongs = []} = response;
    const songs = albumSongs.map(ele => ele.song);
    yield put(loadAlbumSuccess(response, songs));
  } catch (err) {
    // yield put(loadFeaturedAlbum([]));
  }
}

export function* prepareApp() {
  const token = yield localStorage.getItem('token');
  const decoded = jwt_decode(token);
  yield put(setRole(decoded.role));
}

export function* getUserInformation() {
  try {
    const result = yield call(fetchUserInformation);
    yield put(getUserDetailsSuccess(result.data));
  } catch (error) {
    yield put(getUserDetailsFail(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getFeaturedAlbumData() {
  //yield takeLatest(LOAD_ALBUM, getAlbumInfo);
  yield takeLatest(PREPARE_APP, prepareApp);
  yield takeLatest(GET_USER_DETAILS, getUserInformation);
}
