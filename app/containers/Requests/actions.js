import {
  FETCH_REQUESTS,PUT_REQUESTS
} from './constants';

export function fetchRequestsAction() {
  return {
    type: FETCH_REQUESTS,
  };
}

export function putRequestAction(requests) {
  return {
    type: PUT_REQUESTS,
    requests
  };
}
