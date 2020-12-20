// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { put, takeLatest, call } from '@redux-saga/core/effects';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import {
  FORGOT_PASSWORD_REQUEST,
  LOGIN_REQ,
  REGISTER_REQ,
  RESET_PASSWORD_REQUEST,
  VERIFICATION_REQUEST
} from './constants';
import {
  forgotPasswordRequestFail,
  forgotPasswordRequestSuccess,
  loginFail,
  loginSuccess,
  registerFail,
  registerSuccess, resetPasswordRequestFail, resetPasswordRequestSuccess,
  verificationRequestFail,
  verificationRequestSuccess,
} from './actions';
import history from '../../utils/history';
import { setRole } from '../App/actions';
import request from '../../utils/request';

const url = 'https://bliiink.ga';

function loginApi(authParams) {
  return request(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(authParams),
  });
}

function registerApi(authParams) {
  return request(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(authParams),
  });
}

function verificationApi(code) {
  return request(`${url}/auth/verifyCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(code),
  });
}

function forgotPasswordApi(email) {
  return request(`${url}/auth/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(email),
  });
}

function resetPasswordApi(data) {
  return request(`${url}/auth/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
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
    toast.success('A verification code has been sent to your entered email address');
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

export function* forgotPasswordSaga({email}) {
  try {
    yield call(forgotPasswordApi, email);
    yield put(forgotPasswordRequestSuccess());
    history.push('/auth/login');
    toast.success('Password reset token has been sent to your email address.');
  } catch (err) {
    toast.error('Email does not exist.');
    yield put(forgotPasswordRequestFail(err.message));
  }
}

export function* resetPasswordSaga(data) {
  try {
    yield call(resetPasswordApi, {password: data.data.password, token: data.data.token});
    yield put(resetPasswordRequestSuccess());
    history.push('/auth/login');
    toast.success('Your password has been changed successfully.');
  } catch (err) {
    toast.error('Reset password token is invalid.');
    yield put(resetPasswordRequestFail(err.message));
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQ, loginRequest);
  yield takeLatest(REGISTER_REQ, registerRequest);
  yield takeLatest(VERIFICATION_REQUEST, verificationRequest);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
