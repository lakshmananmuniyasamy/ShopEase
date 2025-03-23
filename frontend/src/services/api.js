// /services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4018/api'
});

// Add token to headers
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
