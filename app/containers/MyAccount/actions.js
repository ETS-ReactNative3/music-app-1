import {
  FETCH_ACTIVITY,
  PUT_ACTIVITIES,
  PUT_REVIEWS,
  PUT_RATINGS,
  REQUEST_INFLUENCER,
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
