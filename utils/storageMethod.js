// utils/storageMethod.js
import { STORAGE } from '@/constant/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageMethod = {
  async set(data) {
    await AsyncStorage.setItem(STORAGE.token, JSON.stringify(data));
  },
  async get() {
    const data = await AsyncStorage.getItem(STORAGE.token);
    return JSON.parse(data);
  },
  async remove() {
    await AsyncStorage.removeItem(STORAGE.token);
  },
};

export default storageMethod;
