import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PropertyManagementState } from './types';
import { IProperty } from 'types';
import { Filter } from './types';

export const initialState: PropertyManagementState = {
  loading: false,
  properties: [],
  property: {} as IProperty,
  error: ''
};

const propertySlice = createSlice({
  name: 'propertyManagement',
  initialState,
  reducers: {
    getAllProperties: (state, action: PayloadAction<Filter>) => {
      state.loading = true;
      state.error = '';
    },
    getFilteredProperties: (state, action: PayloadAction<Filter>) => {
      state.loading = true;
      state.error = '';
    },
    getFilteredPropertiesSuccess: (state, action: PayloadAction<IProperty[]>) => {
      state.loading = false;
      state.properties = action.payload;
    },
    getFilteredPropertiesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllPropertiesSuccess: (state, action: PayloadAction<IProperty[]>) => {
      state.loading = false;
      state.properties = action.payload;
    },
    getAllPropertiesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPropertyDetails: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    getPropertyDetailsSuccess: (state, action: PayloadAction<IProperty>) => {
      state.loading = false;
      state.property = action.payload;
    },
    getPropertyDetailsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getAllProperties,
  getFilteredProperties,
  getFilteredPropertiesSuccess,
  getFilteredPropertiesFailed,
  getAllPropertiesSuccess,
  getAllPropertiesFailed,
  getPropertyDetails,
  getPropertyDetailsSuccess,
  getPropertyDetailsFailed
} = propertySlice.actions;

export default propertySlice.reducer;
