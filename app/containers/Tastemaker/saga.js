// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, takeLatest} from "@redux-saga/core/effects";
import {GET_TASTEMAKERS_REQUEST} from "./constants";
import {toast} from "react-toastify";
import api from "../../utils/api";
import {getTasteMakersRequestFail, getTasteMakersRequestSuccess} from "./actions";

function getTasteMakersApi() {
  return api.get('/influencers/list');
}

export function* getTasteMakers() {
  try {
    const result = yield call(getTasteMakersApi);
    yield put(getTasteMakersRequestSuccess(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(getTasteMakersRequestFail(e.message));
  }
}

export default function* tastemakerSaga() {
  yield takeLatest(GET_TASTEMAKERS_REQUEST, getTasteMakers);
}
