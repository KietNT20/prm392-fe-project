import axiosInstance from '@/config/axiosConfig';
import { API } from 'api/apiUrl';

export const authServices = {
  loginUser(payload) {
    return axiosInstance.post(API.LOGIN, payload);
  },

  registerUser(payload) {
    return axiosInstance.post(API.REGISTER, payload);
  },
};
