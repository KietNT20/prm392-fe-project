import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  loading: {
    getProfile: false,
  },
};

export const userProfileSlice = createSlice({
  initialState,
  name: 'userProfile',
  reducers: {
    handleSaveProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer: userProfileReducer } = userProfileSlice;
// Extract and export each action creator by name
export const { clearProfile, handleSaveProfile } = actions;
// Export the reducer, either as a default or named export
export default userProfileReducer;
