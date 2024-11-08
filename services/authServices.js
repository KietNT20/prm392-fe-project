// In authServices.js
import axiosInstance from '@/config/axiosConfig';
import { API } from 'api/apiUrl';

export const authServices = {
  loginUser(payload) {
    return axiosInstance.post(API.LOGIN, payload);
  },

  registerUser(payload) {
    return axiosInstance.post(API.REGISTER, payload);
  },

  // Function to fetch user data by ID
  getUserDetails(userId) {
    return axiosInstance.get(API.USER_BY_ID + userId);
  },
};
