// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { FETCH_CAMPAIGN, LAUNCH_CAMPAIGN } from './constants';
import {axiosInstance} from '../../utils/api';

import { setLoader } from '../App/actions';
import history from '../../utils/history';
import { fetchCampaignAction, putCampaignAction } from './actions';
import { func } from 'prop-types';

function launchCampaign(data) {
  return axiosInstance().post('campaigns', data);
}

function getCampaigns() {
  return axiosInstance().get('campaigns/user');
}

export function* launchCampaignSaga(action) {
  try {
    yield put(setLoader(true));
    const result = yield call(launchCampaign, action.data);
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
  } catch(e) {
    toast.error(e.message);
    yield put(setLoader(false));
  }
}

export default function* campaignSaga() {
  yield takeLatest(LAUNCH_CAMPAIGN, launchCampaignSaga);
  yield takeLatest(FETCH_CAMPAIGN, fetchCampaignSaga);
}
