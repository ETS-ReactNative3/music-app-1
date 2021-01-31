// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/api';
import history from '../../utils/history';
import { getUserDetails, setLoader } from '../App/actions';
import { CampaignStatus } from '../Requests/constants';
import {
  fetchCampaignAction,
  putCampaignAction,
  ratingSubmittingAction,
  reviewSubmittingAction,
  verifySubmittingAction,
  declineSubmittingAction
} from './actions';
import {
  ADD_INFLUENCER_RATING,
  ADD_INFLUENCER_REVIEW,
  DECLINE_REQUEST,
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

function updateCampaignStatusApi(data) {
  return axiosInstance().put('campaigns/status/', data);
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
    const { campaignsId, influencerId, rating, feedback } = action;
    yield put(verifySubmittingAction(true));
    yield call(verifyCampaignAPI, { campaignsId, influencerId });
    yield call(addInfluencerRatingAPI, { campaignsId, influencerId, rating });
    yield call(addInfluencerReviewAPI, {
      campaignsId,
      influencerId,
      review: feedback,
    });
    yield put(fetchCampaignAction());
    toast.success('Campaign Verified for this influencer');
    yield put(verifySubmittingAction(false));
    yield put(getUserDetails());
    history.goBack();
  } catch (e) {
    toast.error(e.message);
    yield put(verifySubmittingAction(false));
  }
}

function* declineCampaignSaga(action) {
  try {
    const { campaignsId,
      influencerId,
      campaignInfluencerId,
      rating,
      feedback, } = action;
      console.log(action);
    yield put(declineSubmittingAction(true));
    yield call(updateCampaignStatusApi, { id: campaignInfluencerId,
      campaignStatusId: CampaignStatus.DECLINED, });
    if (rating && rating > 0) yield call(addInfluencerRatingAPI, { campaignsId, influencerId, rating });
    if (feedback && feedback.length > 0) yield call(addInfluencerReviewAPI, {
      campaignsId,
      influencerId,
      review: feedback,
    });
    yield put(fetchCampaignAction());
    toast.success('Campaign Decline for this influencer');
    yield put(declineSubmittingAction(false));
    history.goBack();
  } catch (e) {
    toast.error(e.message);
    yield put(declineSubmittingAction(false));
  }
}

function* addInfluencerRatingSaga(action) {
  try {
    const { data } = action;
    yield put(ratingSubmittingAction(true));
    yield call(addInfluencerRatingAPI, data);
    yield put(fetchCampaignAction());
    toast.success('Influencer Rating submitted!!');
    yield put(ratingSubmittingAction(false));
  } catch (e) {
    toast.error(e.message);
  }
}

function* addInfluencerReviewSaga(action) {
  try {
    const { data } = action;
    yield put(reviewSubmittingAction(true));
    yield call(addInfluencerReviewAPI, data);
    yield put(fetchCampaignAction());
    toast.success('Influencer Review submitted!!');
    yield put(reviewSubmittingAction(false));
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
  yield takeLatest(DECLINE_REQUEST, declineCampaignSaga);
}
