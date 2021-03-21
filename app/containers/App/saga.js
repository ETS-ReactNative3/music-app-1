/**
 * Gets the default data to save in redux
 */

import {call, put, takeLatest} from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import {PREPARE_APP, GET_USER_DETAILS, TRACK_SONG} from './constants';
import {getUserDetailsFail, getUserDetailsSuccess, setRole} from './actions';
import {axiosInstance} from '../../utils/api';
import {getInfluencerProfileSuccess} from '../Influencer/actions';
import {axiosTrackingInstance} from "../../utils/trackingApi";

function fetchUserInformation() {
  return axiosInstance().get('/auth/userDetails');
}

function fetchInfluencerInformation() {
  return axiosInstance().get('/influencers');
}

function postSongTrackingData(songData) {
  return axiosTrackingInstance().post('/songs', songData);
}

export function* prepareApp() {
  const token = yield localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    yield put(setRole(decoded.role));
  }
}

export function* getUserInformation() {
  try {
    const result = yield call(fetchUserInformation);
    yield put(getUserDetailsSuccess(result.data));
    if (result.data.influencerId) {
      const influencerResult = yield call(fetchInfluencerInformation);
      yield put(getInfluencerProfileSuccess(influencerResult.data));
    }
  } catch (error) {
    yield put(getUserDetailsFail(error));
  }
}

export function* trackSong(data) {
  try {
    yield call(postSongTrackingData, data.songData);
  } catch (error) {
    console.log(error)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getFeaturedAlbumData() {
  yield takeLatest(PREPARE_APP, prepareApp);
  yield takeLatest(GET_USER_DETAILS, getUserInformation);
  yield takeLatest(TRACK_SONG, trackSong);
}
