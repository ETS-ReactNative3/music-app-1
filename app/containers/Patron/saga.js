// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, takeLatest} from '@redux-saga/core/effects';
import {toast} from 'react-toastify';
import {axiosInstance} from '../../utils/api';
import { createStakeProgressAction, saveStakeAction, showProgressAction } from './actions';
import { CREATE_STAKE, FETCH_STAKE } from './constants';
import {getUserDetailsSuccess} from "../App/actions";

function fetchStakeAPI() {
  return axiosInstance().get('stake');
}


function createStakeAPI(data) {
  return axiosInstance().post('stake', data);
}

function fetchUserInformation() {
  return axiosInstance().get('/auth/userDetails');
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


function* createStakeSaga(action) {
  try {
    const {data} = action;
   yield call(createStakeAPI, data);
    yield put(createStakeProgressAction(false));
    toast.success('Stake added');
    const result = yield call(fetchStakeAPI);
    yield put(saveStakeAction(result.data))
    const userResult = yield call(fetchUserInformation);
    yield put(getUserDetailsSuccess(userResult.data));
  } catch (e) {
    toast.error('Not able to create stake');
    yield put(createStakeProgressAction(false));

  }
}

export default function* patronSaga() {
  yield takeLatest(FETCH_STAKE, fetchStakeSaga);
  yield takeLatest(CREATE_STAKE, createStakeSaga);

}
