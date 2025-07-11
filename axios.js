import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend is running on another port or path
});

// Add token to all requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or sessionStorage if you're using that
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
