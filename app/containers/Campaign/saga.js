// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/api';
import history from '../../utils/history';
import { setLoader } from '../App/actions';
import { fetchCampaignAction, putCampaignAction } from './actions';
import {
  ADD_INFLUENCER_RATING,
  ADD_INFLUENCER_REVIEW,
  FETCH_CAMPAIGN,
  LAUNCH_CAMPAIGN,
  VERIFY_CAMPAIGN,
} from './constants';

function launchCampaign(data) {
  return axiosInstance().post('campaigns', data);
}

function getCampaigns() {
  return axiosInstance().get('campaigns/user');
}

function verifyCampaignAPI(data) {
  return axiosInstance().put('campaigns/verify', data);
}

function addInfluencerRatingAPI(data) {
  return axiosInstance().post('campaigns/rating', data);
}

function addInfluencerReviewAPI(data) {
  return axiosInstance().post('campaigns/review', data);
}

export function* launchCampaignSaga(action) {
  try {
    yield put(setLoader(true));
    yield call(launchCampaign, action.data);
    yield put(setLoader(false));
    history.push('/');
    toast.success('Campaign Launched successfully');
  } catch (e) {
    toast.error(e.message);
    yield put(setLoader(false));
  }
}

function* fetchCampaignSaga() {
  try {
    const result = yield call(getCampaigns);
    yield put(putCampaignAction(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(setLoader(false));
  }
}

function* verifyCampaignSaga(action) {
  try {
    const { data } = action;
    yield call(verifyCampaignAPI, data);
    yield put(fetchCampaignAction());
    toast.success('Campaign Verified for this influencer');
    history.goBack();
  } catch (e) {
    toast.error(e.message);
  }
}

function* addInfluencerRatingSaga(action) {
  try {
    const { data } = action;
    yield call(addInfluencerRatingAPI, data);
    yield put(fetchCampaignAction());
    toast.success('Influencer Rating submitted!!');
  } catch (e) {
    toast.error(e.message);
  }
}

function* addInfluencerReviewSaga(action) {
  try {
    const { data } = action;
    yield call(addInfluencerReviewAPI, data);
    yield put(fetchCampaignAction());
    toast.success('Influencer Review submitted!!');
  } catch (e) {
    toast.error(e.message);
  }
}

export default function* campaignSaga() {
  yield takeLatest(LAUNCH_CAMPAIGN, launchCampaignSaga);
  yield takeLatest(FETCH_CAMPAIGN, fetchCampaignSaga);
  yield takeLatest(VERIFY_CAMPAIGN, verifyCampaignSaga);
  yield takeLatest(ADD_INFLUENCER_RATING, addInfluencerRatingSaga);
  yield takeLatest(ADD_INFLUENCER_REVIEW, addInfluencerReviewSaga);
}
