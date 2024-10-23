import axiosInstance from '@/config/axiosConfig';
import { API } from 'api/apiUrl'; // Ensure this path is correct in your structure

export const petServices = {
  getAllPets() {
    return axiosInstance.get(API.PETS);
  },
  getPetDetail(id) {
    return axiosInstance.get(`${API.PET_DETAIL}${id}`);
  },
  addPet() {
    return axiosInstance.post(API.PETS);
  },
  media() {
    return axiosInstance.post(API.MEDIA);
  },
  getImageById(image_id) {
    return axiosInstance.get(`${API.MEDIA}/${image_id}`);
  },
};
