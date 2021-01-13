// import { take, call, put, select } from 'redux-saga/effects';

import {takeLatest} from "redux-saga/effects";
import {CREATE_PAYMENT_REQUEST} from "./constants";
import api from "../../utils/api";
import {call, put} from "@redux-saga/core/effects";
import {toast} from "react-toastify";
import {createPaymentFailAction, createPaymentSuccessAction} from "./actions";

function createPayment(data) {
  return api.post('/order/createPayment', data);
}

function* createPaymentSession(action) {
  console.log(action)
  try {
    const result = yield call(createPayment, {session_id: action.id});
    console.log(result)
    yield put(createPaymentSuccessAction());
  } catch (e) {
    toast.error(e.message);
    yield put(createPaymentFailAction(e.message));
  }
}

// Individual exports for testing
export default function* walletSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CREATE_PAYMENT_REQUEST, createPaymentSession);

}
