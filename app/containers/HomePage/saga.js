/**
 * Gets the repositories of the user from Github
 */

import {call, put, takeLatest} from 'redux-saga/effects';
import {GET_FEATURED_ALBUMS, GET_NEW_RELEASES, GET_TOP_SONGS} from "./constants";
import {axiosInstance} from "../../utils/api";
import {
  getFeaturedAlbumsFail,
  getFeaturedAlbumsSuccess,
  getNewReleasesFail,
  getNewReleasesSuccess,
  getTopSongsFail,
  getTopSongsSuccess
} from "./actions";
import {toast} from "react-toastify";

function fetchNewReleases() {
  return axiosInstance().get('/albums/latest');
}

function fetchTopSongs() {
  return axiosInstance().get('/songs/top');
}

function fetchFeaturedAlbums() {
  return axiosInstance().get('/albums/featured');
}

export function* getNewReleasesSaga() {
  try {
    const result = yield call(fetchNewReleases);
    yield put(getNewReleasesSuccess(result.data));
  } catch (error) {
    toast.error(error.message);
    yield put(getNewReleasesFail(error));
  }
}

export function* getTopSongsSaga() {
  try {
    const result = yield call(fetchTopSongs);
    yield put(getTopSongsSuccess(result.data));
  } catch (error) {
    toast.error(error.message);
    yield put(getTopSongsFail(error));
  }
}

export function* getFeaturedAlbumsSaga() {
  try {
    const result = yield call(fetchFeaturedAlbums);
    yield put(getFeaturedAlbumsSuccess(result.data));
  } catch (error) {
    toast.error(error.message);
    yield put(getFeaturedAlbumsFail(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homePageData() {
  yield takeLatest(GET_NEW_RELEASES, getNewReleasesSaga);
  yield takeLatest(GET_TOP_SONGS, getTopSongsSaga);
  yield takeLatest(GET_FEATURED_ALBUMS, getFeaturedAlbumsSaga);
}
