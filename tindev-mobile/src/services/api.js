import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

let apiURL = API_URL;

const api = axios.create({
  baseURL: apiURL,
});

export default api;
