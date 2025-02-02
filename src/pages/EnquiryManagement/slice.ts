import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { EnquiryManagementState, Enquiry } from './types';

export const initialState: EnquiryManagementState = {
  loading: false,
  error: ''
};

const propertySlice = createSlice({
  name: 'enquiryManagement',
  initialState,
  reducers: {
    createEnquiry: (state, action: PayloadAction<Enquiry>) => {
      state.loading = true;
      state.error = '';
    },
    createEnquirySuccess: state => {
      state.loading = false;
      state.error = '';
    },
    createEnquiryFailed: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { createEnquiry, createEnquirySuccess, createEnquiryFailed } = propertySlice.actions;

export default propertySlice.reducer;
