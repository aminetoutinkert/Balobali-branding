import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000'),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
