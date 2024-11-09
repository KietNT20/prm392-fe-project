import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import userProfileReducer from './reducers/userProfileReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['reducer1', 'reducer2'] // Add reducers you want to persist
};

const rootReducer = combineReducers({
  // Add your reducers here
  userProfile: userProfileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
