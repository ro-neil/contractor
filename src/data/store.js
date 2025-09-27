// store.js
import { configureStore } from '@reduxjs/toolkit';
import estimateReducer from '@/data/EstimateSlice.js';

export default configureStore({
  reducer: {
    estimate: estimateReducer,
  },
});