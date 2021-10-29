/**
 * Gets the default data to save in redux
 */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import {PREPARE_APP, GET_USER_DETAILS, TRACK_SONG, HANDLE_SONG_PLAYING, HANDLE_SINGLE_SONG} from './constants';
import {
  getUserDetailsFail,
  getUserDetailsSuccess,
  setRole,
  successHandleSingleSong,
  successHandleSongPlaying
} from './actions';
import {axiosInstance} from '../../utils/api';
import {getInfluencerProfileSuccess} from '../Influencer/actions';
import {axiosTrackingInstance} from "../../utils/trackingApi";
import {makeSelectSongCount, makeSelectUserDetails} from "./selectors";
import {toast} from "react-toastify";
import history from "../../utils/history";

function fetchUserInformation() {
  return axiosInstance().get('/auth/userDetails');
}

function fetchInfluencerInformation() {
  return axiosInstance().get('/influencers');
}

function postSongTrackingData(songData) {
  return axiosTrackingInstance().post('/records', songData);
}

export function* prepareApp() {
  const token = yield localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.exp < new Date().getTime() / 1000) {
      yield put(setRole('regular'));
    } else {
      yield put(setRole(decoded.role));
    }
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

export function* handlePlaySongAction(data) {
  // if user is not logged in
  const token = yield localStorage.getItem('token');
  if (!token) {
    let songCount = yield select(makeSelectSongCount());
    if (songCount > 7) {
      toast.success("Login to listen to more music")
      history.push('/auth/login');
      return
    }
  }

  // If user is logged in but not subscribed
  const userDetails = yield select(makeSelectUserDetails())
  if (userDetails && !userDetails.subscription) {
    let songCount = yield select(makeSelectSongCount());
    if (songCount > 7) {
      toast.success("Please subscribe to listen to more music")
      history.push('/subscription-plans');
      return
    }
  }

  if (data.type === "boilerplate/App/HANDLE_SINGLE_SONG") {
    yield put(successHandleSingleSong(data.songId, data.status))
  } else {
    yield put(successHandleSongPlaying(data.playing))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getFeaturedAlbumData() {
  yield takeLatest(PREPARE_APP, prepareApp);
  yield takeLatest(GET_USER_DETAILS, getUserInformation);
  yield takeLatest(TRACK_SONG, trackSong);
  yield takeLatest(HANDLE_SONG_PLAYING, handlePlaySongAction);
  yield takeLatest(HANDLE_SINGLE_SONG, handlePlaySongAction)
}
