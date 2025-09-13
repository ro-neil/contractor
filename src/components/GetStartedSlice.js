import { createSlice } from '@reduxjs/toolkit';

export const GetStartedSlice = createSlice({
  name: 'get-started',
  initialState: {
    started: false,
  },
  reducers: {
    setStarted: (state, action) => {
        const isStarted = action.payload;
        state.started = isStarted;
    },
  },
});

export const { setStarted } = GetStartedSlice.actions;
export default GetStartedSlice.reducer;