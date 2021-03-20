// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import {
  BECOME_AN_INFLUENCER,
  GET_GENRES,
  GET_SOCIAL_CHANNELS,
  GET_INFLUENCER_PROFILE,
  GET_INFLUENCER_REQUESTS,
  UPDATE_INFLUENCER_STATUS_REQUEST,
  FETCH_INFLUENCER_STATS,
} from './constants';
import { axiosInstance } from '../../utils/api';
import {
  becomeAnInfluencerSucces,
  becomeAnInfluencerFail,
  getSocialChannelsRequestSuccess,
  getSocialChannelsRequestFail,
  getGenresSuccess,
  getGenresFail,
  getInfluencerProfileSuccess,
  getInfluencerProfileFail,
  getInfluencerRequestsSuccess,
  getInfluencerRequestsFail,
  updateInfluencerStatusSuccess,
  updateInfluencerStatusFail,
  getInfluencerRequests,
  fetchInfluencerStatsSuccessAction,
} from './actions';
import history from '../../utils/history';

function becomeInfuencer(data) {
  return axiosInstance().post('/influencers', data);
}

function getSocialChannelsApi() {
  return axiosInstance().get('/influencers/channels');
}

function fetchGenres() {
  return axiosInstance().get('/songs/genres');
}

function getProfile() {
  return axiosInstance().get('/influencers');
}

function getInfluencers() {
  return axiosInstance().get('/influencers/approvalRequests');
}

function updateStatus(data) {
  return axiosInstance().put('/influencers/status', data);
}

function fetchInfluencerStatsApi(id) {
  return axiosInstance().get(`/influencers/stat/${id}`)
}

export function* becomeAnInfluencerSaga({ data }) {
  try {
    const result = yield call(becomeInfuencer, data);
    yield put(becomeAnInfluencerSucces(result.data));
    toast.success('Request to become an influencer is sent successfully.');
    history.push('/');
  } catch (e) {
    toast.error(e.message);
    yield put(becomeAnInfluencerFail(e.message));
  }
}

export function* getSocialChannels() {
  try {
    const result = yield call(getSocialChannelsApi);
    yield put(getSocialChannelsRequestSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getSocialChannelsRequestFail(e.message));
  }
}

export function* getGenresSaga() {
  try {
    const result = yield call(fetchGenres);
    yield put(getGenresSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getGenresFail(e.message));
  }
}

export function* getInfluencerProfile() {
  try {
    const result = yield call(getProfile);
    yield put(getInfluencerProfileSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getInfluencerProfileFail(e.message));
  }
}

export function* getInfluencerRequestsSaga() {
  try {
    const result = yield call(getInfluencers);
    yield put(getInfluencerRequestsSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getInfluencerRequestsFail(e.message));
  }
}

export function* updateInfluencerStatus({ data }) {
  try {
    yield call(updateStatus, data);
    yield put(updateInfluencerStatusSuccess());
    yield put(getInfluencerRequests());
    if (data.influencerStatusId === 1) {
      toast.success('User request to become a tastemaker is rejected.');
    } else {
      toast.success('The user is now a tastemaker.');
    }
  } catch (e) {
    toast.error(e.message);
    yield put(updateInfluencerStatusFail(e.message));
  }
}

function* fetchInfluencerStatsSaga({id}) {
  try {
    const response = yield call(fetchInfluencerStatsApi, id);
    if (response) {
      yield put(fetchInfluencerStatsSuccessAction(response.data))
    }
  } catch (e) {
    toast.error(e.message);
  }
}

export default function* influencerSaga() {
  yield takeLatest(BECOME_AN_INFLUENCER, becomeAnInfluencerSaga);
  yield takeLatest(GET_SOCIAL_CHANNELS, getSocialChannels);
  yield takeLatest(GET_GENRES, getGenresSaga);
  yield takeLatest(GET_INFLUENCER_PROFILE, getInfluencerProfile);
  yield takeLatest(GET_INFLUENCER_REQUESTS, getInfluencerRequestsSaga);
  yield takeLatest(UPDATE_INFLUENCER_STATUS_REQUEST, updateInfluencerStatus);
  yield takeLatest(FETCH_INFLUENCER_STATS, fetchInfluencerStatsSaga)
}
