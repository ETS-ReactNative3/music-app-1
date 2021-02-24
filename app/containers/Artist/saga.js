import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
// import { take, call, put, select } from 'redux-saga/effects';

import { axiosInstance } from "../../utils/api";
import { saveArtistAction } from "./actions";
import { FETCH_ARTIST, FOLLOW_ARTIST } from "./constants";

// Individual exports for testing
function fetchArtistProfile(id) {
  return axiosInstance().get(`users/artist/${id}`)
}

function followArtist(data) {
  return axiosInstance().post('users/followArtist/action', data)
}

function* fetchArtistSaga(action) {
  const {id} = action;
  try {
    const response = yield call(fetchArtistProfile, id)
    yield put(saveArtistAction(response.data))
  }catch(e) {
    toast.error(e);
  }
}

function* followArtistSaga(action) {
  const {artist} = action;
  try {
    yield call(followArtist, artist);
    toast.success("Artist added to your library")
  } catch(e) {
    toast.error(e);
  }
}

export default function* artistSaga() {
  yield takeLatest(FETCH_ARTIST, fetchArtistSaga),
  yield takeLatest(FOLLOW_ARTIST, followArtistSaga)
}
