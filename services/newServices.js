import { API } from "@/api/apiUrl";
import axiosInstance from "@/config/axiosConfig";

export const newServices = {
  getAllNews() {
    return axiosInstance.get(API.NEWS);
  },
  getNewDetail(id) {
    return axiosInstance.get(`${API.NEWS_DETAIL}${id}`);
  },
  deleteNew(id) {
    return axiosInstance.delete(API.DELETE_NEWS, {
      data: { id } 
    });
  },
  queryNew(name) {
    return axiosInstance.get(`${API.NEWS_QUERY}?name=${name}`);
  },
};
