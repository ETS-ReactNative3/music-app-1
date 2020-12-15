// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { put, takeLatest, call } from '@redux-saga/core/effects';
import jwt_decode from 'jwt-decode';
import { LOGIN_REQ, REGISTER_REQ, VERIFICATION_REQUEST } from './constants';
import {
  loginFail,
  loginSuccess,
  registerFail,
  registerSuccess,
  verificationRequestFail,
  verificationRequestSuccess,
} from './actions';
import api from '../../utils/api';
import history from '../../utils/history';
import { setRole } from '../App/actions';
import {toast} from "react-toastify";

function loginApi(authParams) {
  return api.request({
    method: 'post',
    url: '/auth/login',
    data: authParams,
  });
}

function registerApi(authParams) {
  return api.request({
    method: 'post',
    url: '/auth/register',
    data: authParams,
  });
}

function verificationApi(code) {
  return api.post('/auth/verifyCode', code);
}

export function* loginRequest({ data }) {
  try {
    const result = yield call(loginApi, data);
    yield localStorage.setItem('token', result.data.access_token);
    const decoded = jwt_decode(result.data.access_token);
    yield put(loginSuccess());
    yield put(setRole(decoded.role));
    history.push('/');
  } catch (err) {
    toast.error(err.message);
    yield put(loginFail(err.message));
  }
}

export function* registerRequest({ data }) {
  try {
    yield call(registerApi, data);
    yield put(registerSuccess());
    history.push('/auth/verification');
  } catch (err) {
    toast.error(err.message);
    yield put(registerFail(err.message));
  }
}

export function* verificationRequest({ code }) {
  try {
    yield call(verificationApi, code);
    yield put(verificationRequestSuccess());
    history.push('/auth/login');
    toast.success('Account verified successfully.');
  } catch (err) {
    toast.error(err.message);
    yield put(verificationRequestFail(err.message));
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQ, loginRequest);
  yield takeLatest(REGISTER_REQ, registerRequest);
  yield takeLatest(VERIFICATION_REQUEST, verificationRequest);
}
