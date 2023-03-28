import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://81.163.28.122/api'
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
