import axios from 'axios';

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
    baseURL: process.env.TRACKING_API_URL,
    headers,
  });
}

