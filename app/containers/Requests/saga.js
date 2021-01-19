// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/api';
import { putRequestAction, putUserActivities, putUserRatings, putUserReviews } from './actions';
import { FETCH_ACTIVITY, FETCH_REQUESTS, REQUEST_INFLUENCER, SUBMIT_REQUEST_FEEDBACK, SUBMIT_REQUEST_SOCAIL_LINKS, UPDATE_CAMPAIGN_STATUS } from './constants';

function requestInfluencerApi() {
  return axiosInstance().get('influencers/requests');
}

function updateCampaignStatusApi(data) {
  return axiosInstance().put('campaigns/status/', data);
}

function submitFeedbackRequestApi(data) {
  return axiosInstance().post('campaigns/feedback/', data);
}
function submitSocialLinksRequestApi(data) {
  return axiosInstance().post('campaigns/service/', data);
}

export function* fetchRequestSaga() {
  try {
    const result = yield call(requestInfluencerApi);
    yield put(putRequestAction(result.data));
  } catch (e) {
    toast.error(e.message);
  }
}

export function* updateCampaignStatusSaga(action) {
  const { campaignId, statusId } = action;
  yield call(updateCampaignStatusApi, { id: campaignId, campaignStatusId: statusId });
}

export function* submitFeedbackRequestSaga(action) {
  console.log('cm hadfads', action)
  const { campaignId, influencerId, feedback } = action;
  yield call(submitFeedbackRequestApi, {
    influencerId: influencerId,
    campaignsId: campaignId,
    feedback: feedback
  })
}

export function* submitSocialLinksRequestSaga(action) {
  const {data} = action;
  yield call(submitSocialLinksRequestApi, data);
}

export default function* accountSaga() {
  yield takeLatest(FETCH_REQUESTS, fetchRequestSaga);
  yield takeLatest(UPDATE_CAMPAIGN_STATUS, updateCampaignStatusSaga);
  yield takeLatest(SUBMIT_REQUEST_FEEDBACK, submitFeedbackRequestSaga);
  yield takeLatest(SUBMIT_REQUEST_SOCAIL_LINKS, submitSocialLinksRequestSaga);
}
