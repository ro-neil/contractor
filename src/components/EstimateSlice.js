import { createSlice } from '@reduxjs/toolkit';

export const EstimateSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
  },
  reducers: {
    addJob: (state, action) => {
        const job = action.payload;
        state.jobs.push(job);
    },
    removeJob: (state, action) => {
        const description = action.payload;
        state.jobs = state.jobs.filter((job) => job.description !== description);
    },
    updateJobQuantity: (state, action) => {
        const { description, quantity } = action.payload;
        const jobToUpdate = state.jobs.find(job => job.description === description);
        if (jobToUpdate && quantity >= 0) {
          jobToUpdate.quantity = quantity;        
        }
    }
  },
});

export const { addJob, removeJob, updateJobQuantity } = EstimateSlice.actions;
export default EstimateSlice.reducer;