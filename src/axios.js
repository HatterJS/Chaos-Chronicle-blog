import axios from 'axios';
import { backendUrl } from './variables.js';

const instance = axios.create({
  baseURL: backendUrl
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

export default instance;
