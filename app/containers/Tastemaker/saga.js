// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { GET_TASTEMAKERS_REQUEST } from './constants';
import api from '../../utils/api';
import {
  getTasteMakersRequestFail,
  getTasteMakersRequestSuccess,
} from './actions';
import { setLoader } from '../App/actions';

function getTasteMakersApi(data) {
  let url = 'influencers/list' ;
  if (data.searchText) {url = url +`?text=${data.searchText}`} else {url = url + `?text=`;}
  if (data.filters && data.filters.facebook) url = url + '&facebook=true';
  if (data.filters && data.filters.instagram) url = url + '&instagram=true';
  if (data.filters && data.filters.twitter) url = url + '&twitter=true';
  if (data.filters && data.filters.blog) url = url + '&blog=true';
  if (data.filters && data.filters.youtube) url = url + '&youtube=true';
  if (data.filters && data.filters.genre) url = url + '&genre=' + data.filters.genre.join(',')
  return api.get(url);
}

export function* getTasteMakers(action) {
  try {
    yield put(setLoader(true));
    const result = yield call(getTasteMakersApi, action.data);
    yield put(getTasteMakersRequestSuccess(result.data));
    yield put(setLoader(false));
  } catch (e) {
    toast.error(e.message);
    yield put(getTasteMakersRequestFail(e.message));
    yield put(setLoader(false));
  }
}

export default function* tastemakerSaga() {
  yield takeLatest(GET_TASTEMAKERS_REQUEST, getTasteMakers);
}
