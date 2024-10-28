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
  updatePet(id, updatedPetData) {
    return axiosInstance.put(`${API.PET_UPDATE}${id}`, updatedPetData);
  },
  deletePet(id) {
    return axiosInstance.delete(`${API.DELETE_PET}${id}`);
  },
  getImageById(image_id) {
    return axiosInstance.get(`${API.MEDIA}/${image_id}`);
  },
  media(formData) {
    return axiosInstance.post(API.MEDIA, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });
  },
};
