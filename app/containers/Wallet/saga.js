// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_PAYMENT, FETCH_PAYMENT_HISTORY } from "./constants";
import api from '../../utils/api';
import { savePaymentHistoryAction } from "./actions";

function fetchPaymentHistoryApi() {
  return api.get('order/list');
}

function* fetchPaymentHistorySaga() {
  const response = yield call(fetchPaymentHistoryApi);
  yield put(savePaymentHistoryAction(response.data));
}

function* createPayment(action) {
  const { payload, addressInfo } = action;
  console.log(action);
  
  const params = {
    // mandatory
    number: payload.payment.number,
    expMonth: Number(card.expiry.split('/')[0]),
    expYear: Number(card.expiry.split('/')[1]),
    cvc: card.cvv,
    // optional
    name: values.name,
    currency: 'usd',
    addressLine1: values.addressLine1,
    addressLine2: values.addressLine2,
    addressCity: values.addressCity,
    addressState: values.addressState,
    addressCountry: values.addressCountry,
    addressZip: values.addressZip,

    country: values.addressCountry
  }

  // const internalToken = yield stripe.createTokenWithCard(params)
  // // const {tokenId, value} = action;
  // const token = yield select(AuthSelectors.accessToken)

  // console.log(internalToken, token)
  // // // get current data from Store
  // // // make the call to the api

  // const response = yield call(api.createPayment, token, { token: internalToken.tokenId, amount: values.amount, description: 'Testing' })
  // // success?
  // console.log(response)
}
// Individual exports for testing
export default function* walletSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CREATE_PAYMENT, createPayment);
  yield takeLatest(FETCH_PAYMENT_HISTORY, fetchPaymentHistorySaga);

}
