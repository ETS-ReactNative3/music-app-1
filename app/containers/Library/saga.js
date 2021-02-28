// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/api';
import { saveFollowedAlbumsAction } from './actions';
import { FETCH_FOLLOWED_ALBUMS, FETCH_FOLLOWED_ARTIST } from './constants';


function fetchFollowedAlbumsAPI() {
  return axiosInstance().get('albums/followed');
}

function fetchFollowedArtistAPI() {
  return axiosInstance().get('artist/followed');
}

function* fetchFollowedAlbumsSaga() {
  try {
    const result = yield call(fetchFollowedAlbumsAPI);
    yield put(saveFollowedAlbumsAction(result.data));
  } catch (e) {
    toast.error(e.message);
  }
}

function* fetchFollowedArtistSaga() {
  try {
    const result = yield call(fetchFollowedArtistAPI);
    // yield put(putCampaignAction(result.data));
  } catch (e) {
    toast.error(e.message);
  }
}

export default function* campaignSaga() {
  yield takeLatest(FETCH_FOLLOWED_ALBUMS, fetchFollowedAlbumsSaga);
  yield takeLatest(FETCH_FOLLOWED_ARTIST, fetchFollowedArtistSaga);
}
