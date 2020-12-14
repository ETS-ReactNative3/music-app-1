import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../utils/api';
import {
  deleteSongFail,
  deleteSongSuccess,
  getSongRequestFail,
  getSongRequestSuccess,
  postSongRequestFail,
  postSongRequestSuccess,
  songRequest,
  songRequestFail,
  songRequestSuccess,
  updateSongRequestFail,
  updateSongRequestSuccess,
  uploadSongFailure,
  uploadSongSuccess
} from './actions';
import {
  DELETE_SONG, GET_SONG_REQUEST, GET_SONGS_REQUEST, POST_SONG_REQUEST, UPLOAD_SONG_REQUEST
} from './constants';
import history from '../../utils/history';

function getSongsApi() {
  return api.get('/songs');
}

function getSongApi(id) {
  return api.get(`/songs/${id}`);
}

function deleteSongApi(id) {
  return api.delete(`/songs/${id}`);
}

function postSong(data) {
  return api.request({
    method: 'post',
    url: '/songs',
    data
  });
}

function editSong(data) {
  return api.put('/songs', data);
}

export function* fetchSongs() {
  try {
    const result = yield call(getSongsApi);
    yield put(songRequestSuccess(result.data));
  } catch (e) {
    yield put(songRequestFail(e.message));
  }
}

export function* getSong({ id }) {
  try {
    const result = yield call(getSongApi, id);
    yield put(getSongRequestSuccess(result.data));
  } catch (e) {
    yield put(getSongRequestFail(e.message));
  }
}

function postSongApi(id, action) {
  const formData = new FormData();
  formData.append('file', action.audio[0]);
  return api.post(
    `/songs/upload/audio/${id}`,
    formData
  );
}

function postSongImage(data) {
  const imageData = new FormData();
  imageData.append('photo', data.songImage[0]);
  return api.post(
    '/songs/upload',
    imageData,
  );
}

export function* uploadSong(action) {
  try {
    const result = yield call(postSongApi, action);
    yield put(uploadSongSuccess(result));
    history.push('/song-list');
  } catch (err) {
    yield put(uploadSongFailure(err));
  }
}

export function* deleteSong({ id }) {
  try {
    const result = yield call(deleteSongApi, id);
    yield put(songRequest());
    yield put(deleteSongSuccess(result));
  } catch (err) {
    yield put(deleteSongFail(err));
  }
}

export function* saveSongSaga({ data }) {
  try {
    const result = yield call(postSongImage, data);
    const songData = { ...data, artwork: result.data.location, imageKey: result.data.imageKey };
    const response = yield call(postSong, songData);
    yield call(postSongApi, response.data.id, songData);
    yield put(postSongRequestSuccess());
    history.push('/songList');
  } catch (e) {
    yield put(postSongRequestFail(e.message));
  }
}

export function* updateSongSaga({ data }) {
  try {
    const result = yield call(editSong, data);
    yield put(updateSongRequestSuccess());
  } catch (e) {
    yield put(updateSongRequestFail(e.message));
  }
}

export default function* watchSong() {
  yield takeLatest(GET_SONGS_REQUEST, fetchSongs);
  yield takeLatest(UPLOAD_SONG_REQUEST, uploadSong);
  yield takeLatest(DELETE_SONG, deleteSong);
  yield takeLatest(GET_SONG_REQUEST, getSong);
  yield takeLatest(POST_SONG_REQUEST, saveSongSaga);
  yield takeLatest(UPLOAD_SONG_REQUEST, updateSongSaga);
}
