import axios from 'axios';

let apiURL;
if (process.env.NODE_ENV === 'development') {
  apiURL = 'http://localhost:3001';
}

if (process.env.NODE_ENV === 'production') {
  apiURL = 'https://tindev-app.herokuapp.com';
}

const api = axios.create({
  baseURL: apiURL
});

export default api;
