// store.js
import { configureStore } from '@reduxjs/toolkit';
import estimateReducer from './components/EstimateSlice';
import getStartedReducer from './components/GetStartedSlice';

export default configureStore({
  reducer: {
    estimate: estimateReducer,
    getStarted: getStartedReducer,
  },
});