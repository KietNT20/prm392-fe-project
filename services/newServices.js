import { API } from '@/api/apiUrl';
import axiosInstance from '@/config/axiosConfig';

export const newServices = {
  getAllNews() {
    return axiosInstance.get(API.NEWS);
  },
  getNewDetail(id) {
    return axiosInstance.get(`${API.NEWS_DETAIL}${id}`);
  },
  deleteNew(id) {
    return axiosInstance.delete(API.DELETE_NEWS, {
      data: { id },
    });
  },
  updateNew(data) {
    return axiosInstance.put(API.UPDATE_NEWS, data);
  },
  addNew(data) {
    return axiosInstance.post(API.ADD_NEWS, data);
  },
  queryNew(name) {
    return axiosInstance.get(`${API.NEWS_QUERY}?name=${name}`);
  },
};
