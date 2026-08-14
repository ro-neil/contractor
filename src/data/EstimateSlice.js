import { createSlice } from '@reduxjs/toolkit';

export const EstimateSlice = createSlice({
  name: 'estimate',
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
        jobToUpdate.quantity = parseInt(quantity);        
      } else {
        jobToUpdate.quantity = 0;
      }
    },
    updateJobDescription: (state, action) => {
      const { oldDescription, newDescription } = action.payload;
      const jobToUpdate = state.jobs.find(job => job.description === oldDescription);
      if (jobToUpdate) {
        jobToUpdate.description = newDescription;
      }
    },
    updateJobRate: (state, action) => {
      const { description, rate } = action.payload;
      const jobToUpdate = state.jobs.find(job => job.description === description);
      if (jobToUpdate && rate >= 0) {
        jobToUpdate.rate = parseFloat(rate);
      }
    },
    updateJobUnit: (state, action) => {
      const { description, unit } = action.payload;
      const jobToUpdate = state.jobs.find(job => job.description === description);
      if (jobToUpdate) {
        jobToUpdate.unit = unit;
      }
    },
    updateJobCategory: (state, action) => {
      const { description, category } = action.payload;
      const jobToUpdate = state.jobs.find(job => job.description === description);
      if (jobToUpdate) {
        jobToUpdate.category = category;
      }
    },
  },
});

export const { getJobByDescription } = EstimateSlice.selectors;

export const { 
  addJob, 
  removeJob, 
  updateJobQuantity, 
  updateJobDescription, 
  updateJobRate, 
  updateJobUnit, 
  updateJobCategory,
} = EstimateSlice.actions;


export default EstimateSlice.reducer;