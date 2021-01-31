// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { CREATE_PAYMENT_REQUEST, FETCH_PAYMENT_HISTORY } from './constants';
import { axiosInstance } from '../../utils/api';
import {
  savePaymentHistoryAction,
  createPaymentFailAction,
  createPaymentSuccessAction,
} from './actions';
import {getUserDetails, getUserDetailsSuccess} from "../App/actions";

function fetchPaymentHistoryApi() {
  return axiosInstance().get('order/list');
}

function* fetchPaymentHistorySaga() {
  const response = yield call(fetchPaymentHistoryApi);
  yield put(savePaymentHistoryAction(response.data));
}

function createPayment(data) {
  return axiosInstance().post('/order/createPayment', data);
}

function fetchUserInformation() {
  return axiosInstance().get('/auth/userDetails');
}

function* createPaymentSession(action) {
  try {
    yield call(createPayment, { session_id: action.id });
    yield put(createPaymentSuccessAction());
    const result = yield call(fetchUserInformation);
    yield put(getUserDetailsSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(createPaymentFailAction(e.message));
  }
}

// Individual exports for testing
export default function* walletSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_PAYMENT_HISTORY, fetchPaymentHistorySaga);
  yield takeLatest(CREATE_PAYMENT_REQUEST, createPaymentSession);
}
