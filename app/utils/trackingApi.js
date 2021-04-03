import axios from 'axios';
import {server} from "../../config";

export function axiosTrackingInstance() {
  const accessToken = localStorage.getItem('token');
  let headers = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers = {
      Authorization: `bearer ${accessToken}`,
    };
  }

  return axios.create({
    // baseURL: 'http://localhost:3006/',
    baseURL: server.trackingApiURL,
    headers,
  });
}

