import { BASE_URL } from '@/utils/environment';
import storageMethod from '@/utils/storageMethod';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${storageMethod.get().token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosInstance;
