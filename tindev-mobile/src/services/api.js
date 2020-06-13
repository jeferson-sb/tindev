import axios from 'axios';

let apiURL;
if (process.env.NODE_ENV === 'development') {
  apiURL = 'http://localhost:3333';
} else if (process.env.NODE_ENV === 'production') {
  apiURL = 'https://tindev.herokuapp.com';
}

const api = axios.create({
  baseURL: apiURL,
});

export default api;
