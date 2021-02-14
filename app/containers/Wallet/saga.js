// import { take, call, put, select } from 'redux-saga/effects';

import {call, put, takeLatest} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {
  ADD_PAYMENT_METHOD,
  CREATE_PAYMENT_REQUEST,
  DELETE_PAYMENT_METHOD,
  FETCH_PAYMENT_HISTORY, GET_ALL_WITHDRAWAL_REQUESTS, GET_EARNINGS,
  GET_PAYMENT_METHODS, GET_WITHDRAWAL_REQUESTS, PAY_WITHDRAWAL_REQUESTS,
  SUBMIT_WITHDRAWAL_AMOUNT_REQUEST
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
  deletePaymentMethodsFailAction,
  getPaymentMethodsAction,
  submitWithdrawalAmountSuccessAction,
  submitWithdrawalAmountFailAction,
  getWithdrawalRequestsSuccessAction,
  getWithdrawalRequestsFailAction,
  getEarningsSuccessAction,
  getEarningsFailAction,
  getWithdrawalListRequestsSuccessAction,
  getWithdrawalListRequestsFailAction,
  payWithdrawalRequestSuccessAction,
  payWithdrawalRequestFailAction,
  getWithdrawalListRequestsAction,
} from './actions';
import {getUserDetailsSuccess} from "../App/actions";
import history from "../../utils/history";

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

function getEarnings() {
  return axiosInstance().get('/influencers/earnings');
}

function getWithdrawalRequests() {
  return axiosInstance().get('/influencers/my/withdrawal');
}

function getWithdrawalRequestList() {
  return axiosInstance().get('/influencers/withdrawal/requests');
}

function deletePaymentMethod(id) {
  return axiosInstance().delete(`/influencers/method/${id}`);
}

function submitWithdrawal(data) {
  return axiosInstance().post('/influencers/withdrawal/request', data);
}

function payWithdrawal(data) {
  return axiosInstance().put('/influencers/withdrawal/request/status', data);
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

function* submitWithdrawalAmount(action) {
  try {
    yield call(submitWithdrawal, action.data);
    yield put(submitWithdrawalAmountSuccessAction());
    toast.success('Withdrawal request sent successfully');
    history.push('/wallet/history');
  } catch (e) {
    toast.error(e.message);
    yield put(submitWithdrawalAmountFailAction(e.message));
  }
}

function* fetchWithdrawalRequests() {
  try {
    const result = yield call(getWithdrawalRequests);
    yield put(getWithdrawalRequestsSuccessAction(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getWithdrawalRequestsFailAction(e.message));
  }
}

function* fetchEarnings() {
  try {
    const result = yield call(getEarnings);
    yield put(getEarningsSuccessAction(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getEarningsFailAction(e.message));
  }
}

function* fetchWithdrawalList() {
  try {
    const result = yield call(getWithdrawalRequestList);
    yield put(getWithdrawalListRequestsSuccessAction(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getWithdrawalListRequestsFailAction(e.message));
  }
}

function* payWithdrawalRequest(action) {
  try {
    yield call(payWithdrawal, action.data);
    yield put(payWithdrawalRequestSuccessAction());
    yield put(getWithdrawalListRequestsAction());
    toast.success('Tastemaker paid successfully');
  } catch (e) {
    toast.error(e.message);
    yield put(payWithdrawalRequestFailAction(e.message));
  }
}

// Individual exports for testing
export default function* walletSaga() {
  yield takeLatest(FETCH_PAYMENT_HISTORY, fetchPaymentHistorySaga);
  yield takeLatest(CREATE_PAYMENT_REQUEST, createPaymentSession);
  yield takeLatest(ADD_PAYMENT_METHOD, addPaymentMethod);
  yield takeLatest(GET_PAYMENT_METHODS, fetchPaymentMethods);
  yield takeLatest(DELETE_PAYMENT_METHOD, removePaymentMethod);
  yield takeLatest(SUBMIT_WITHDRAWAL_AMOUNT_REQUEST, submitWithdrawalAmount);
  yield takeLatest(GET_WITHDRAWAL_REQUESTS, fetchWithdrawalRequests);
  yield takeLatest(GET_EARNINGS, fetchEarnings);
  yield takeLatest(GET_ALL_WITHDRAWAL_REQUESTS, fetchWithdrawalList);
  yield takeLatest(PAY_WITHDRAWAL_REQUESTS, payWithdrawalRequest);
}
