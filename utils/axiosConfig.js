import { API } from 'api/apiUrl';
import axios from 'axios';
import { BASE_URL } from '../config/environment';
import storageMethod from './storageMethod';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    config.headers.Authorization = `Bearer ${storageMethod.get().access_token}`;
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
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log('error', error);
    const originalRequest = error.config;

    // If error status is 403 or 401 and request has not key _retry
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Call API refresh token for new token
        const res = await axiosInstance.get(`${API.REFRESH_TOKEN}`, {
          headers: {
            Authorization: `Bearer ${storageMethod.get()?.refresh_token}`,
          },
        });

        const { access_token, refresh_token } = res || {};
        // Save new token to localStorage
        storageMethod.set({ access_token, refresh_token });

        // Change Authorization header
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // Call API again with new token
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        // Handle when refresh token fail
        storageMethod.remove();
        return Promise.reject(error);
      }
    }

    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosInstance;
