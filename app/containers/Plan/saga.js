// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { setLoader } from '../App/actions';
import { REQUEST_INFLUENCER, UPDATE_INFLUENCER } from './constants';

function requestInfluencerApi(data) {
  return api.post('influencers', data);
}

function updateInfluencerApi(data) {
  return api.put('influencers', data);
}

export function* requestInfluencerSaga(data) {
  try {
    yield put(setLoader(true));
    const result = yield call(requestInfluencerApi, data);
    toast.success('Request for influencers is Successfully submitted.');
    yield put(setLoader(false));
  } catch (e) {
    toast.error(e.message);
    yield put(setLoader(false));
  }
}

export function* updateInfluencerSaga(data) {
  try {
    yield put(setLoader(true));
    const result = yield call(updateInfluencerApi, data);
    toast.success('Influencer Updated');
    yield put(setLoader(false));
  } catch (e) {
    toast.error(e.message);
    yield put(setLoader(false));
  }
}

export default function* planSaga() {
  yield takeLatest(REQUEST_INFLUENCER, requestInfluencerSaga);
  yield takeLatest(UPDATE_INFLUENCER, updateInfluencerSaga);
}
