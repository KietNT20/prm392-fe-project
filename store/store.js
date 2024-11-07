import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import userProfileReducer from './reducers/userProfile.reducer';

// Import your reducers here
// import yourReducer from './yourSlice';

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
