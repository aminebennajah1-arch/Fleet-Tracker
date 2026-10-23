import axios from 'axios';

// Configuration de base pour contacter notre backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Ajout automatique du token de sécurité s'il existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;