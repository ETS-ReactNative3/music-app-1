import axios from 'axios';

export function axiosInstance() {
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
    baseURL: 'https://staging.bliiink.ga/',
    headers,
  });
}

