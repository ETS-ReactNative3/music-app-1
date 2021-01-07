import { REQUEST_INFLUENCER, UPDATE_INFLUENCER } from './constants';

export function requestInfluencer(data) {
  return {
    type: REQUEST_INFLUENCER,
    data,
  };
}

export function updateInfluencer(data) {
  return {
    type: UPDATE_INFLUENCER,
    data,
  };
}
