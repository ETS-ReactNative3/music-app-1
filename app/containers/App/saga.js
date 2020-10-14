/**
 * Gets the default data to save in redux
 */

import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import { LOAD_DEFAULT_DATA, LOAD_ALBUM } from './constants';
import { defaultDataLoaded, loadAlbumSuccess } from './actions';
import request from '../../utils/request';
import albumInfo from '../../utils/json/playlist';

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
export function* getAlbumInfo() {
  const requestURL = `https://bliiink.ga/albums/songs/slug/album-1`;
  try {
    const response = yield call(request, requestURL);
    console.log(response);
    const { albumSongs = [] } = response;
    yield put(loadAlbumSuccess(response, albumSongs));
  } catch (err) {
    // yield put(loadFeaturedAlbum([]));
  }
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
}
