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
    baseURL: process.env.API_URL,
    headers,
  });
}

