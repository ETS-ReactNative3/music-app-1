import {takeLatest, call} from "@redux-saga/core/effects";
import {GET_MY_SUPPORTED_ARTISTS, GET_PER_STREAM_COST, GET_SONGS_STATS, GET_USER_CENTRIC_COST} from "./constants";
import {axiosInstance} from "../../utils/api";
import {toast} from "react-toastify";
import {put} from "redux-saga/effects";
import {
  getMySupportedArtistsFailure,
  getMySupportedArtistsSuccess, getPerStreamCostFailure, getPerStreamCostSuccess,
  getSongsStatsFailure,
  getSongsStatsSuccess, getUserCentricCostFailure, getUserCentricCostSuccess
} from "./actions";

function fetchSongStats() {
  return axiosInstance().get('songs/earnings');
}

function fetchSupportedArtist() {
  return axiosInstance().get('users/mySupportedArtists');
}

function fetchPerStreamCost() {
  return axiosInstance().get('subscriptions/perStreamCost');
}

function fetchUserCentricCost() {
  return axiosInstance().get('subscriptions/userCentricAmount');
}

function* getSongStats() {
  try {
    const result = yield call(fetchSongStats)
    yield put(getSongsStatsSuccess(result.data))
  } catch (e) {
    toast.error(e.message);
    yield put(getSongsStatsFailure)
  }
}

function* getMySupportedArtist() {
  try {
    const result = yield call(fetchSupportedArtist)
    yield put(getMySupportedArtistsSuccess(result.data.count))
  } catch (e) {
    toast.error(e.message)
    yield put(getMySupportedArtistsFailure)
  }
}

function* getPerStreamCost() {
  try {
    const result = yield call(fetchPerStreamCost)
    yield put(getPerStreamCostSuccess(result.data.cost))
  } catch (e) {
    toast.error(e.message)
    yield put(getPerStreamCostFailure)
  }
}

function* getUserCentricAmount() {
  try {
    const result = yield call(fetchUserCentricCost)
    yield put(getUserCentricCostSuccess(result.data.totalAmount))
  } catch (e) {
    toast.error(e.message)
    yield put(getUserCentricCostFailure)
  }
}

export default function* earningsSaga() {
  yield takeLatest(GET_SONGS_STATS, getSongStats);
  yield takeLatest(GET_MY_SUPPORTED_ARTISTS, getMySupportedArtist);
  yield takeLatest(GET_PER_STREAM_COST, getPerStreamCost);
  yield takeLatest(GET_USER_CENTRIC_COST, getUserCentricAmount);
}
