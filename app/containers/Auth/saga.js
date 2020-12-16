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
import history from '../../utils/history';
import { setRole } from '../App/actions';
import {toast} from "react-toastify";
import request from '../../utils/request';

const url = 'https://bliiink.ga';

function loginApi(authParams) {
  return request(url + '/auth/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(authParams),
  });
}

function registerApi(authParams) {
  return request(url + '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(authParams),
  });
}

function verificationApi(code) {
  return request(url + '/auth/verifyCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(code),
  });
}

export function* loginRequest({ data }) {
  try {
    const result = yield call(loginApi, data);
    yield localStorage.setItem('token', result.access_token);
    const decoded = jwt_decode(result.access_token);
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
