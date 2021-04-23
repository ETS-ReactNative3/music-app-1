// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import {call, put, takeLatest} from '@redux-saga/core/effects';
import {toast} from 'react-toastify';
import {axiosInstance} from '../../utils/api';
import {getUserDetails} from '../App/actions';
import {
  putUserRatings,
  putUserReviews,
  updateInfluencerProcessingAction,
  updateProcessingAction,
  saveUsersCountriesAction
} from './actions';
import {
  FETCH_ACTIVITY,
  FETCH_USERS_COUNTRIES,
  REQUEST_INFLUENCER,
  UPDATE_INFLUENCER_DETAILS, UPDATE_REGULAR_USER_DETAILS,
  UPDATE_USER_DETAILS,
} from './constants';

function requestInfluencerApi(data) {
  return axiosInstance().post('influencers', data);
}

function getUserRatingsAPI(userId) {
  return axiosInstance().get(`campaigns/ratings/${userId}`);
}

function getUserReviewsAPI(userId) {
  return axiosInstance().get(`campaigns/reviews/${userId}`);
}

function updateUserDetailsApi(data) {
  return axiosInstance().put('users', data);
}

function updateArtistDetailsApi(data) {
  return axiosInstance().put('users/artist', data);
}

function updateInfluencerDetailsApi(data) {
  return axiosInstance().put('influencers', data);
}

function fetchUserCountriesAPI() {
  return axiosInstance().get('users/countries');
}

function updateAvatar(data) {
  const base64 = data; // Place your base64 url here.
  return fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      const fd = new FormData();
      const file = new File([blob], 'filename.jpeg');
      fd.append('avatar', file);

      return axiosInstance().post('users/upload/avatar', fd);
    });
}

function updateCoverPhoto(data) {
  const base64 = data; // Place your base64 url here.
  return fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      const fd = new FormData();
      const file = new File([blob], 'filename.jpeg');
      fd.append('coverPhoto', file);

      return axiosInstance().post('users/upload/coverPhoto', fd);
    });
}

export function* requestInfluencerSaga(data) {
  try {
    yield call(requestInfluencerApi, data);
  } catch (e) {
    toast.error(e.message);
  }
}

export function* getUserActivitiesSaga({userId}) {
  try {
    let response = yield call(getUserRatingsAPI, userId);
    if (response.statusText === 'OK') {
      let totalRatings = 0;
      response.data.map(rating => {
        totalRatings += rating.rating;
        return true;
      });
      yield put(
        putUserRatings(
          totalRatings / response.data.length,
          response.data.length,
        ),
      );
    }

    response = yield call(getUserReviewsAPI, userId);
    yield put(putUserReviews(response.data));
  } catch (e) {
    console.error(e);
  }
}

function* updateUserDetailsSaga(action) {
  try {
    yield put(updateProcessingAction(true));
    let {data} = action;
    const {isProfilePhotoUpdated, isCoverPhotoUpdated} = action;
    if (isProfilePhotoUpdated) {
      const response = yield call(updateAvatar, data.profilePhoto);
      data = {
        ...data,
        avatar: response.data.avatarLocation,
        avatarImageKey: response.data.avatarImageKey,
      };
    }

    if (isCoverPhotoUpdated) {
      const response = yield call(updateCoverPhoto, data.coverPhotoLocal);
      data = {
        ...data,
        coverPhoto: response.data.coverPhotoLocation,
        coverPhotoImageKey: response.data.coverPhotoImageKey,
      };
    }

    delete data.profilePhoto;
    delete data.coverPhotoLocal;
    yield call(updateArtistDetailsApi, data);

    yield put(getUserDetails());
    toast.success('User information updated successfully');
    yield put(updateProcessingAction(false));
  } catch (e) {
    toast.error(e.message);
    yield put(updateProcessingAction(false));
  }
}

function* updateRegularUserSaga(action) {
  try {
    yield put(updateProcessingAction(true));
    let {data} = action;
    const {isProfilePhotoUpdated} = action;
    if (isProfilePhotoUpdated) {
      const response = yield call(updateAvatar, data.profilePhoto);
      data = {
        ...data,
        avatar: response.data.avatarLocation,
        avatarImageKey: response.data.avatarImageKey,
      };
    }

    delete data.profilePhoto;
    yield call(updateUserDetailsApi, data);
    yield put(getUserDetails());
    toast.success('User information updated successfully');
    yield put(updateProcessingAction(false));
  } catch (e) {
    toast.error(e.message);
    yield put(updateProcessingAction(false));
  }
}

function* updateInfluencerDetailsSaga(action) {
  try {
    yield put(updateInfluencerProcessingAction(true));
    const {data} = action;

    yield call(updateInfluencerDetailsApi, data);

    yield put(getUserDetails());
    // history.goBack();
    toast.success('Influencer information updated successfully');
    yield put(updateInfluencerProcessingAction(false));
  } catch (e) {
    toast.error(e.message);
    yield put(updateInfluencerProcessingAction(false));
  }
}

function* fetchUserCountriesSaga() {
  try {
    const result = yield call(fetchUserCountriesAPI);
    yield put(saveUsersCountriesAction(result.data))
  } catch (e) {
    yield put(saveUsersCountriesAction([]))
  }
}

export default function* accountSaga() {
  yield takeLatest(REQUEST_INFLUENCER, requestInfluencerSaga);
  yield takeLatest(FETCH_ACTIVITY, getUserActivitiesSaga);
  yield takeLatest(UPDATE_USER_DETAILS, updateUserDetailsSaga);
  yield takeLatest(UPDATE_INFLUENCER_DETAILS, updateInfluencerDetailsSaga);
  yield takeLatest(UPDATE_REGULAR_USER_DETAILS, updateRegularUserSaga);
  yield takeLatest(FETCH_USERS_COUNTRIES, fetchUserCountriesSaga);
}
