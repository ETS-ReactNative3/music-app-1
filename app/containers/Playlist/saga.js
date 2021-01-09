// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import {
  GET_PLAYLIST_REQUEST,
  ADD_SONG_INTO_PAYLIST,
  CREATE_PLAYLIST_AND_ADD_SONG,
  CREATE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_REQUEST,
  GET_MY_PLAYLISTS_REQUEST,
  DELETE_SONG_PLAYLIST_REQUEST,
} from './constants';
import api from '../../utils/api';
import {
  addSongIntoPlaylistFail,
  addSongIntoPlaylistSuccess,
  createPlaylistandAddSongFail,
  createPlaylistandAddSongSuccess,
  createPlaylistFail,
  createPlaylistSuccess,
  deletePlaylistFail,
  deletePlaylistSuccess,
  deleteSongFail,
  deleteSongSuccess,
  getMyPlaylist,
  getMyPlaylistFail,
  getMyPlaylistSuccess,
  getPlaylistFail,
  getPlaylistSuccess,
  togglePlaylistPopup,
  getPlaylist,
} from './actions';

function postPlaylist(data) {
  return api.post('/playlists', data);
}

function getMyPlaylistsApi() {
  return api.get('/playlists/myPlaylists');
}

function deletePlaylistApi(id) {
  return api.delete(`/playlists/${id}`);
}

function getPlaylistApi(id) {
  return api.get(`/playlists/${id}`);
}

function deleteSongApi(id, songId) {
  return api.delete(`/playlists/${id}/song/${songId}`);
}

function addSongIntoPaylistApi(data) {
  return api.post('/playlists/songs', data);
}

export function* createPlaylistSaga({ data }) {
  try {
    yield call(postPlaylist, data);
    yield put(createPlaylistSuccess());
    yield put(togglePlaylistPopup(false));
    toast.success('Playlist created successfully.');
  } catch (e) {
    toast.error(e.message);
    yield put(createPlaylistFail(e.message));
  }
}

export function* getMyPlaylists() {
  try {
    const result = yield call(getMyPlaylistsApi);
    yield put(getMyPlaylistSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getMyPlaylistFail(e.message));
  }
}

export function* getPlaylistSaga({ id }) {
  try {
    const result = yield call(getPlaylistApi, id);
    yield put(getPlaylistSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getPlaylistFail(e.message));
  }
}

export function* deletePlaylist({ id }) {
  try {
    const result = yield call(deletePlaylistApi, id);
    yield put(getMyPlaylist());
    yield put(deletePlaylistSuccess(result.data));
    toast.success('Playlist deleted successfully.');
  } catch (e) {
    toast.error(e.message);
    yield put(deletePlaylistFail(e.message));
  }
}

export function* deleteSongFromPlaylist({ id, songId }) {
  try {
    yield call(deleteSongApi, id, songId);
    yield put(getPlaylist(id));
    yield put(deleteSongSuccess());
    toast.success('Song deleted from playlist successfully.');
  } catch (e) {
    toast.error(e.message);
    yield put(deleteSongFail(e.message));
  }
}

export function* addSongIntoPaylist({ data }) {
  try {
    const result = yield call(addSongIntoPaylistApi, data);
    yield put(addSongIntoPlaylistSuccess(result.data));
    toast.success('Song Successfully added into Playlist.');
  } catch (e) {
    toast.error(e.message);
    yield put(addSongIntoPlaylistFail(e.message));
  }
}

export function* createPlaylistAddSong({ data }) {
  try {
    const result = yield call(postPlaylist, { title: data.title });
    yield call(addSongIntoPaylistApi, {
      id: result.data.id,
      songId: data.songId,
    });
    yield put(createPlaylistandAddSongSuccess());
    toast.success('Song Successfully added into Playlist.');
  } catch (e) {
    toast.error(e.message);
    yield put(createPlaylistandAddSongFail(e.message));
  }
}

export default function* playlistSaga() {
  yield takeLatest(CREATE_PLAYLIST_REQUEST, createPlaylistSaga);
  yield takeLatest(GET_MY_PLAYLISTS_REQUEST, getMyPlaylists);
  yield takeLatest(GET_PLAYLIST_REQUEST, getPlaylistSaga);
  yield takeLatest(DELETE_PLAYLIST_REQUEST, deletePlaylist);
  yield takeLatest(ADD_SONG_INTO_PAYLIST, addSongIntoPaylist);
  yield takeLatest(CREATE_PLAYLIST_AND_ADD_SONG, createPlaylistAddSong);
  yield takeLatest(DELETE_SONG_PLAYLIST_REQUEST, deleteSongFromPlaylist);
}
