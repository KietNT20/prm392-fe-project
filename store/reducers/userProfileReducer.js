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
    handleGetProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer: userProfileReducer } = userProfileSlice;
// Extract and export each action creator by name
export const { handleGetProfile } = actions;
// Export the reducer, either as a default or named export
export default userProfileReducer;
