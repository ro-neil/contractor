// store.js
import { configureStore } from '@reduxjs/toolkit';
import estimateReducer from './components/EstimateSlice';

export default configureStore({
  reducer: {
    estimate: estimateReducer,
  },
});