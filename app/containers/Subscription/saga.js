import {call, put, takeLatest} from "redux-saga/effects";
import {CREATE_SUBSCRIPTION_PAYMENT_REQUEST, GET_PLANS} from "./constants";
import {toast} from "react-toastify";
import {createSubscriptionPaymentSuccess, getPlansSuccess} from "./actions";
import {axiosInstance} from "../../utils/api";
import {getUserDetailsSuccess} from "../App/actions";

function fetchSubscriptionList() {
  return axiosInstance().get('/subscriptions');
}

function createPayment(data) {
  return axiosInstance().post('/subscriptions/createPayment', data);
}

function fetchUserInformation() {
  return axiosInstance().get('/auth/userDetails');
}

export function* getPlanList() {
  try {
    const result = yield call(fetchSubscriptionList);
    yield put(getPlansSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
  }
}

function* createPaymentSession(action) {
  try {
    yield call(createPayment, {session_id: action.id});
    yield put(createSubscriptionPaymentSuccess());
    const result = yield call(fetchUserInformation);
    yield put(getUserDetailsSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
  }
}

export default function* subscriptionSaga() {
  yield takeLatest(GET_PLANS, getPlanList);
  yield takeLatest(CREATE_SUBSCRIPTION_PAYMENT_REQUEST, createPaymentSession);
}
