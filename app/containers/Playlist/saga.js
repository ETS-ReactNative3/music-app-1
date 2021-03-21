// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, takeLatest} from '@redux-saga/core/effects';
import {toast} from 'react-toastify';
import {
  GET_PLAYLIST_REQUEST,
  ADD_SONG_INTO_PAYLIST,
  CREATE_PLAYLIST_AND_ADD_SONG,
  CREATE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_REQUEST,
  GET_MY_PLAYLISTS_REQUEST,
  DELETE_SONG_PLAYLIST_REQUEST,
  UPDATE_PLAYLIST_REQUEST,
  FOLLOW_PLAYLIST,
  GET_POPULAR_PLAYLIST
} from './constants';
import {axiosInstance} from '../../utils/api';
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

  getPlaylist, updatePlaylistSuccess, updatePlaylistFail, toggleUpdatePlaylistPopup,

  getPopularPlaylistSuccessAction,
  getPopularPlaylistErrorAction
} from './actions';

function postPlaylist(data) {
  return axiosInstance().post('/playlists', data);
}

function editPlaylist(data) {
  return axiosInstance().put('/playlists', data);
}

function getMyPlaylistsApi() {
  return axiosInstance().get('/playlists/myPlaylists');
}

function deletePlaylistApi(id) {
  return axiosInstance().delete(`/playlists/${id}`);
}

function getPlaylistApi(id) {
  return axiosInstance().get(`/playlists/${id}`);
}

function deleteSongApi(id, songId) {
  return axiosInstance().delete(`/playlists/${id}/song/${songId}`);
}

function addSongIntoPaylistApi(data) {
  return axiosInstance().post('/playlists/songs', data);
}

function followPlayList(data) {
  return axiosInstance().post('playlists/like', data);
}

function fetchPopularPlaylist() {
  return axiosInstance().get('/playlists/popular');
}
export function* createPlaylistSaga({data}) {
  try {
    yield call(postPlaylist, data);
    yield put(createPlaylistSuccess());
    yield put(togglePlaylistPopup(false));
    yield put(getMyPlaylist());
    toast.success('Playlist created successfully.');
  } catch (e) {
    toast.error(e.message);
    yield put(createPlaylistFail(e.message));
  }
}

export function* updatePlaylistSaga({data}) {
  try {
    yield call(editPlaylist, data);
    yield put(getMyPlaylist());
    yield put(updatePlaylistSuccess());
    yield put(toggleUpdatePlaylistPopup(false));
    toast.success('Playlist updated successfully.');
  } catch (e) {
    toast.error(e.message);
    yield put(updatePlaylistFail(e.message));
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

export function* getPlaylistSaga({id}) {
  try {
    const result = yield call(getPlaylistApi, id);
    yield put(getPlaylistSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getPlaylistFail(e.message));
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

export function* deleteSongFromPlaylist({id, songId}) {
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

export function* addSongIntoPaylist({data}) {
  try {
    const result = yield call(addSongIntoPaylistApi, data);
    yield put(addSongIntoPlaylistSuccess(result.data));
    toast.success('Song Successfully added into Playlist.');
  } catch (e) {
    toast.error(e.message);
    yield put(addSongIntoPlaylistFail(e.message));
  }
}

export function* createPlaylistAddSong({data}) {
  try {
    const result = yield call(postPlaylist, {title: data.title});
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

export function* followPlayListSaga(action) {
  const {playlistId, like} = action;
  try {
    yield call(followPlayList, {playlistId});
    if (like) toast.success('Playlist added to your playlists');
    else toast.success('Playlist removed from your playlists');
    yield put(getPlaylist(playlistId))
  } catch (e) {
    toast.error(e);
  }
}

function* getPopularPlaylistSaga() {
  try {
    const result = yield call(fetchPopularPlaylist);
    yield put(getPopularPlaylistSuccessAction(result.data));
  } catch (error) {
    toast.error(error.message);
    yield put(getPopularPlaylistErrorAction(error));
  }
}
export default function* playlistSaga() {
  yield takeLatest(CREATE_PLAYLIST_REQUEST, createPlaylistSaga);
  yield takeLatest(UPDATE_PLAYLIST_REQUEST, updatePlaylistSaga);
  yield takeLatest(GET_MY_PLAYLISTS_REQUEST, getMyPlaylists);
  yield takeLatest(GET_PLAYLIST_REQUEST, getPlaylistSaga);
  yield takeLatest(DELETE_PLAYLIST_REQUEST, deletePlaylist);
  yield takeLatest(ADD_SONG_INTO_PAYLIST, addSongIntoPaylist);
  yield takeLatest(CREATE_PLAYLIST_AND_ADD_SONG, createPlaylistAddSong);
  yield takeLatest(DELETE_SONG_PLAYLIST_REQUEST, deleteSongFromPlaylist);
  yield takeLatest(FOLLOW_PLAYLIST, followPlayListSaga);
  yield takeLatest(GET_POPULAR_PLAYLIST, getPopularPlaylistSaga);

}
