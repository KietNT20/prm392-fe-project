import { API } from 'api/apiUrl';
import axiosInstance from 'utils/axiosConfig';

export const authServices = {
  loginUser(payload) {
    return axiosInstance.post(API.LOGIN, payload);
  },

  registerUser(payload) {
    return axiosInstance.post(API.REGISTER, payload);
  },
};
