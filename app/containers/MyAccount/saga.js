// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { putUserActivities, putUserRatings, putUserReviews } from './actions';
import { FETCH_ACTIVITY, REQUEST_INFLUENCER } from './constants';

function requestInfluencerApi(data) {
  return api.post('influencers', data);
}

function getUserActivitiesAPI(userId) {
  return api.get(`campaigns/user/${userId}`);
}

function getUserRatingsAPI(userId) {
  return api.get(`campaigns/ratings/${userId}`);
}

function getUserReviewsAPI(userId) {
  return api.get(`campaigns/reviews/${userId}`);
}

export function* requestInfluencerSaga(data) {
  try {
    const result = yield call(requestInfluencerApi, data);
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

export default function* accountSaga() {
  yield takeLatest(REQUEST_INFLUENCER, requestInfluencerSaga);
  yield takeLatest(FETCH_ACTIVITY, getUserActivitiesSaga);
}
