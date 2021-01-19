// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import {axiosInstance} from '../../utils/api';
import { putRequestAction, putUserActivities, putUserRatings, putUserReviews } from './actions';
import { FETCH_ACTIVITY, FETCH_REQUESTS, REQUEST_INFLUENCER } from './constants';

function requestInfluencerApi() {
  return axiosInstance().get('influencers/requests');
}

export function* fetchRequestSaga() {
  try {
    const result = yield call(requestInfluencerApi);
    yield put(putRequestAction(result.data));
  } catch (e) {
    toast.error(e.message);
  }
}


export default function* accountSaga() {
  yield takeLatest(FETCH_REQUESTS, fetchRequestSaga);
}
