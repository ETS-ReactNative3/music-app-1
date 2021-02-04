import {
  FETCH_ACTIVITY,
  PUT_ACTIVITIES,
  PUT_REVIEWS,
  PUT_RATINGS,
  REQUEST_INFLUENCER,
  UPDATE_USER_DETAILS,
  UPDATE_INFLUENCER_DETAILS,
  UPDATE_PROCESSING,
  UPDATE_INFLUENCER_PROCESSING,
} from './constants';

export function requestInfluencer(data) {
  return {
    type: REQUEST_INFLUENCER,
    data,
  };
}

export function fetchUserActivities(userId) {
  return {
    type: FETCH_ACTIVITY,
    userId,
  };
}
export function putUserActivities(activities) {
  return {
    type: PUT_ACTIVITIES,
    activities,
  };
}
export function putUserReviews(reviews) {
  return {
    type: PUT_REVIEWS,
    reviews,
  };
}
export function putUserRatings(ratings, ratingCount) {
  return {
    type: PUT_RATINGS,
    ratings,
    ratingCount,
  };
}

export function updateUserDetailsAction(data, isProfilePhotoUpdated, isCoverPhotoUpdated) {
  return {
    type: UPDATE_USER_DETAILS,
    data,
    isProfilePhotoUpdated,
    isCoverPhotoUpdated
  };
}

export function updateInfluencerDetailsAction(data) {
  return {
    type: UPDATE_INFLUENCER_DETAILS,
    data,
  };
}
export function updateProcessingAction(flag) {
  return {
    type: UPDATE_PROCESSING,
    flag,
  };
}

export function updateInfluencerProcessingAction(flag) {
  return {
    type: UPDATE_INFLUENCER_PROCESSING,
    flag,
  };
}
