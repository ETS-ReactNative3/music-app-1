// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utils/api';
import { getUserDetails } from '../App/actions';
import {
  putUserActivities,
  putUserRatings,
  putUserReviews,
  updateInfluencerProcessingAction,
  updateProcessingAction,
} from './actions';
import {
  FETCH_ACTIVITY,
  REQUEST_INFLUENCER,
  UPDATE_INFLUENCER_DETAILS,
  UPDATE_USER_DETAILS,
} from './constants';

function requestInfluencerApi(data) {
  return axiosInstance().post('influencers', data);
}

function getUserActivitiesAPI(userId) {
  return axiosInstance().get(`campaigns/user/${userId}`);
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

function updateInfluencerDetailsApi(data) {
  return axiosInstance().put('influencers', data);
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

export function* getUserActivitiesSaga({ userId }) {
  try {
    let response = yield call(getUserActivitiesAPI, userId);
    // success?

    if (response.statusText === 'OK') {
      yield put(putUserActivities(response.data));
    }

    response = yield call(getUserRatingsAPI, userId);
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

    if (response.statusText === 'OK') {
      yield put(putUserReviews(response.data));
    }
  } catch (e) {
    console.error(e);
  }
}

function* updateUserDetailsSaga(action) {
  try {
    yield put(updateProcessingAction(true));
    let { data } = action;
    const { isProfilePhotoUpdated, isCoverPhotoUpdated } = action;
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
    yield call(updateUserDetailsApi, data);

    yield put(getUserDetails());
    // history.goBack();
    toast.success('User information updated successfully');
    yield put(updateProcessingAction(false));
  } catch (e) {
    toast.error(e.message);
    yield put(updateProcessingAction(false));
  }
}

function* updateInfluencerDetailslSaga(action) {
  try {
    yield put(updateInfluencerProcessingAction(true));
    const { data } = action;

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

export default function* accountSaga() {
  yield takeLatest(REQUEST_INFLUENCER, requestInfluencerSaga);
  yield takeLatest(FETCH_ACTIVITY, getUserActivitiesSaga);
  yield takeLatest(UPDATE_USER_DETAILS, updateUserDetailsSaga);
  yield takeLatest(UPDATE_INFLUENCER_DETAILS, updateInfluencerDetailslSaga);
}
