// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { LAUNCH_CAMPAIGN } from './constants';
import {axiosInstance} from '../../utils/api';

import { setLoader } from '../App/actions';

function launchCampaign(data) {
  return axiosInstance().post('campaigns', data);
}

export function* launchCampaignSaga(action) {
  try {
    yield put(setLoader(true));
    const result = yield call(launchCampaign, action.data);
    yield put(setLoader(false));
  } catch (e) {
    toast.error(e.message);
    yield put(setLoader(false));
  }
}

export default function* campaignSaga() {
  yield takeLatest(LAUNCH_CAMPAIGN, launchCampaignSaga);
}
