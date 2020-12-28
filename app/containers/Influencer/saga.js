// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import {
  BECOME_AN_INFLUENCER,
} from './constants';
import api from '../../utils/api';
import {
  becomeAnInfluencerSucces,
  becomeAnInfluencerFail
} from './actions';

function becomeInfuencer(data) {
  return api.post('/influencers', data);
}

export function* becomeAnInfluencerSaga({ data }) {
  try {
    const result = yield call(becomeInfuencer, data);
    yield put(becomeAnInfluencerSucces(result.data));
    toast.success('Song Successfully added into Playlist.');
  } catch (e) {
    toast.error(e.message);
    yield put(becomeAnInfluencerFail(e.message));
  }
}

export default function* influencerSaga() {
  yield takeLatest(BECOME_AN_INFLUENCER, becomeAnInfluencerSaga);
}
