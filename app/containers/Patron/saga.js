// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, takeLatest} from '@redux-saga/core/effects';
import {toast} from 'react-toastify';
import {axiosInstance} from '../../utils/api';
import { saveStakeAction, showProgressAction } from './actions';
import { FETCH_STAKE } from './constants';

function fetchStakeAPI() {
  return axiosInstance().get('stake');
}

function* fetchStakeSaga() {
  try {
    const result = yield call(fetchStakeAPI);
    yield put(saveStakeAction(result.data))
    yield put(showProgressAction(false));
  } catch (e) {
    yield put(saveStakeAction([]))
    yield put(showProgressAction(false));

  }
}

export default function* patronSaga() {
  yield takeLatest(FETCH_STAKE, fetchStakeSaga);
  
}
