import { API } from '@/api/apiUrl';
import axiosInstance from '@/config/axiosConfig';

export const cartPetService = {
  getAllCartPets() {
    return axiosInstance.get(API.CART_PETS);
  },
  getCartPetById(id) {
    return axiosInstance.get(`${API.CART_PETS}/${id}`);
  },
  addCartPet(payload) {
    return axiosInstance.post(API.CART_PETS, payload);
  },
  updateStatusCartPet(id, payload) {
    return axiosInstance.patch(`${API.CART_PETS}/${id}`, payload);
  },
  deleteCartPet(id) {
    return axiosInstance.delete(`${API.CART_PETS}/${id}`);
  },
};
