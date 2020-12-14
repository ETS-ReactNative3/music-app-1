import axios from 'axios';

const accessToken = localStorage.getItem('token');
let headers = {};
if (accessToken) {
  headers = {
    Authorization: `bearer ${accessToken}`,
  };
}

export default axios.create({
  baseURL: 'https://bliiink.ga/',
  headers,
});
