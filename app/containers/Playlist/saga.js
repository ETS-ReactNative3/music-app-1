// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {CREATE_PLAYLIST_REQUEST, DELETE_PLAYLIST_REQUEST, GET_MY_PLAYLISTS_REQUEST} from "./constants";
import api from "../../utils/api";
import {
  createPlaylistFail,
  createPlaylistSuccess, deletePlaylistFail, deletePlaylistSuccess, getMyPlaylist,
  getMyPlaylistFail,
  getMyPlaylistSuccess,
  togglePlaylistPopup
} from "./actions";
import {toast} from "react-toastify";

function postPlaylist(data) {
  return api.post('/playlists', data);
}

function getMyPlaylistsApi() {
  return api.get('/playlists/myPlaylists');
}

function deletePlaylistApi(id) {
  return api.delete(`/playlists/${id}`);
}

export function* createPlaylistSaga({data}) {
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

export function* deletePlaylist({id}) {
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

export default function* playlistSaga() {
  yield takeLatest(CREATE_PLAYLIST_REQUEST, createPlaylistSaga);
  yield takeLatest(GET_MY_PLAYLISTS_REQUEST, getMyPlaylists);
  yield takeLatest(DELETE_PLAYLIST_REQUEST, deletePlaylist);
}
