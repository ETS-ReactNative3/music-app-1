// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/api';
import { putUserActivities, putUserRatings, putUserReviews } from './actions';
import {
  FETCH_ACTIVITY,
  REQUEST_INFLUENCER,
  UPDATE_INFLUENCER_DETAILS,
  UPDATE_USER_DETAILS,
} from './constants';

function requestInfluencerApi(data) {
  return axiosInstance().post('influencers', data);
}

function getUserActivitiesAPI(userId) {
  return axiosInstance().get(`campaigns/user/${userId}`);
}

function getUserRatingsAPI(userId) {
  return axiosInstance().get(`campaigns/ratings/${userId}`);
}

function getUserReviewsAPI(userId) {
  return axiosInstance().get(`campaigns/reviews/${userId}`);
}

function updateUserDetailsApi(data) {
  return axiosInstance().put('users', data);
}

function updateInfluencerDetailsApi(data) {
  return axiosInstance().put('influencers', data);
}

export function* requestInfluencerSaga(data) {
  try {
    yield call(requestInfluencerApi, data);
  } catch (e) {
    toast.error(e.message);
  }
}

export function* getUserActivitiesSaga({ userId }) {
  let response = yield call(getUserActivitiesAPI, userId);
  // success?

  if (response.statusText === 'OK') {
    yield put(putUserActivities(response.data));
  }

  response = yield call(getUserRatingsAPI, userId);
  if (response.statusText === 'OK') {
    let totalRatings = 0;
    response.data.map(rating => {
      totalRatings += rating.rating;
    });
    yield put(
      putUserRatings(totalRatings / response.data.length, response.data.length),
    );
  }

  response = yield call(getUserReviewsAPI, userId);

  if (response.statusText === 'OK') {
    yield put(putUserReviews(response.data));
  }
}

function* updateUserDetailsSaga(action) {
  try {
    const { data } = action;
    yield call(updateUserDetailsApi, data);
    toast.success('User information updated successfully');
  } catch (e) {
    toast.error(e.message);
  }
}

function* updateInfluencerDetailslSaga(action) {
  try {
    const { data } = action;
    yield call(updateInfluencerDetailsApi, data);
    toast.success('Influencer profile updated successfully');
  } catch (e) {
    toast.error(e.message);
  }
}

export default function* accountSaga() {
  yield takeLatest(REQUEST_INFLUENCER, requestInfluencerSaga);
  yield takeLatest(FETCH_ACTIVITY, getUserActivitiesSaga);
  yield takeLatest(UPDATE_USER_DETAILS, updateUserDetailsSaga);
  yield takeLatest(UPDATE_INFLUENCER_DETAILS, updateInfluencerDetailslSaga);
}
