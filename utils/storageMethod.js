import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from 'constant/storage';

export const asyncStorage = {
  get: () => JSON.parse(AsyncStorage.getItem(STORAGE.token)),
  set: (token) => AsyncStorage.setItem(STORAGE.token, JSON.stringify(token)),
  remove: () => AsyncStorage.removeItem(STORAGE.token),
};

const storageMethod = {
  get: () => {
    return asyncStorage.get();
  },
  set: (token) => {
    // console.log("token", token);
    asyncStorage.set(token);
  },
  remove: () => {
    asyncStorage.remove();
  },
};

export default storageMethod;
