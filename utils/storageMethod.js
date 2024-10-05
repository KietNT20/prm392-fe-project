import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from 'constant/storage';

export const localMemory = {
  get: () => JSON.parse(AsyncStorage.getItem(STORAGE.token)),
  set: (token) => AsyncStorage.setItem(STORAGE.token, JSON.stringify(token)),
  remove: () => AsyncStorage.removeItem(STORAGE.token),
};

const storageMethod = {
  get: () => {
    return localMemory.get();
  },
  set: (token) => {
    // console.log("token", token);
    localMemory.set(token);
  },
  remove: () => {
    localMemory.remove();
  },
};

export default storageMethod;
