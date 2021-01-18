// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import {axiosInstance} from '../../utils/api';
import { putUserActivities, putUserRatings, putUserReviews } from './actions';
import { FETCH_ACTIVITY, REQUEST_INFLUENCER } from './constants';

function requestInfluencerApi(data) {
  return axiosInstance().post('influencers', data);
}

export function* requestInfluencerSaga(data) {
  try {
    const result = yield call(requestInfluencerApi, data);
  } catch (e) {
    toast.error(e.message);
  }
}


export default function* accountSaga() {
  // yield takeLatest(FETCH_ACTIVITY, getUserActivitiesSaga);
}
