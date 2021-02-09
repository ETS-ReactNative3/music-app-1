// import { take, call, put, select } from 'redux-saga/effects';

import {call, put, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {
  ADD_PAYMENT_METHOD,
  CREATE_PAYMENT_REQUEST,
  DELETE_PAYMENT_METHOD,
  FETCH_PAYMENT_HISTORY,
  GET_PAYMENT_METHODS
} from './constants';
import {axiosInstance} from '../../utils/api';
import {
  savePaymentHistoryAction,
  createPaymentFailAction,
  createPaymentSuccessAction,
  addPaymentMethodFailAction,
  addPaymentMethodSuccessAction,
  getPaymentMethodsSuccessAction,
  getPaymentMethodsFailAction,
  deletePaymentMethodsSuccessAction,
  deletePaymentMethodsFailAction, getPaymentMethodsAction,
} from './actions';
import {getUserDetailsSuccess} from "../App/actions";

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

function createPaymentMethod(data) {
  return axiosInstance().post('/influencers/method', data);
}

function getPaymentMethods() {
  return axiosInstance().get('/influencers/methods');
}

function deletePaymentMethod(id) {
  return axiosInstance().delete(`/influencers/method/${id}`);
}

function* createPaymentSession(action) {
  try {
    yield call(createPayment, {session_id: action.id});
    yield put(createPaymentSuccessAction());
    const result = yield call(fetchUserInformation);
    yield put(getUserDetailsSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(createPaymentFailAction(e.message));
  }
}

function* addPaymentMethod(action) {
  try {
    yield call(createPaymentMethod, action.methodData);
    yield put(addPaymentMethodSuccessAction());
    toast.success('Payment method added successfully');
    yield put(getPaymentMethodsAction());
  } catch (e) {
    toast.error(e.message);
    yield put(addPaymentMethodFailAction(e.message));
  }
}

function* fetchPaymentMethods() {
  try {
    const result = yield call(getPaymentMethods);
    yield put(getPaymentMethodsSuccessAction(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getPaymentMethodsFailAction(e.message));
  }
}

function* removePaymentMethod(action) {
  try {
    const result = yield call(deletePaymentMethod, action.id);
    yield put(deletePaymentMethodsSuccessAction(result.data));
    yield put(getPaymentMethodsAction());
  } catch (e) {
    toast.error(e.message);
    yield put(deletePaymentMethodsFailAction(e.message));
  }
}

// Individual exports for testing
export default function* walletSaga() {
  yield takeLatest(FETCH_PAYMENT_HISTORY, fetchPaymentHistorySaga);
  yield takeLatest(CREATE_PAYMENT_REQUEST, createPaymentSession);
  yield takeLatest(ADD_PAYMENT_METHOD, addPaymentMethod);
  yield takeLatest(GET_PAYMENT_METHODS, fetchPaymentMethods);
  yield takeLatest(DELETE_PAYMENT_METHOD, removePaymentMethod);
}
