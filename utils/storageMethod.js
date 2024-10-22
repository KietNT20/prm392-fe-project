import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from 'constant/storage';

export const localMemory = {
  get: async () => {
    try {
      const token = await AsyncStorage.getItem(STORAGE.token);
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.error('Error getting token from AsyncStorage:', error);
      return null;
    }
  },
  set: async (token) => {
    try {
      await AsyncStorage.setItem(STORAGE.token, JSON.stringify(token));
    } catch (error) {
      console.error('Error setting token to AsyncStorage:', error);
    }
  },
  remove: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE.token);
    } catch (error) {
      console.error('Error removing token from AsyncStorage:', error);
    }
  },
};

const storageMethod = {
  get: async () => {
    return await localMemory.get();
  },
  set: async (token) => {
    await localMemory.set(token);
  },
  remove: async () => {
    await localMemory.remove();
  },
};

export default storageMethod;
