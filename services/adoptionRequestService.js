import { API } from '@/api/apiUrl';
import axiosInstance from '@/config/axiosConfig';

export const adoptionRequestService = {
  createAdoptReq({ petId, userId, name, address, phoneNumber, cccd }) {
    return axiosInstance.post(API.ADOPT_REQ, {
      petId,
      userId,
      name,
      address,
      phoneNumber,
      cccd,
    });
  },
  updateStatusAdoptReq({ id, status }) {
    return axiosInstance.patch(API.ADOPT_REQ, { id, status });
  },
};
