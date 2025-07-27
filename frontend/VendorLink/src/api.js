import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const login = (email, password) => API.post('/login', { email, password });
export const register = (email, password) => API.post('/register', { email, password });
export const getProfile = () => API.get('/profile');
export const getMarketplace = () => API.get('/marketplace');
export const getOrders = () => API.get('/orders');
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getChats = () => API.get('/chat');
export const sendChat = (msgData) => API.post('/chat', msgData);