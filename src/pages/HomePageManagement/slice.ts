import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PropertyManagementState } from './types';
import { IProperty } from 'types';
import { Filter } from '../PropertyManagement/containers/PropertyFilter/types';

export const initialState: PropertyManagementState = {
  loading: false,
  properties: [],
  property: {} as IProperty,
  error: ''
};

const propertySlice = createSlice({
  name: 'homeManagement',
  initialState,
  reducers: {
    getAllProperties: (state, action: PayloadAction<Filter>) => {
      state.loading = true;
      state.error = '';
    },
    getAllPropertiesSuccess: (state, action: PayloadAction<IProperty[]>) => {
      state.loading = false;
      state.properties = action.payload;
    },
    getAllPropertiesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getAllProperties, getAllPropertiesSuccess, getAllPropertiesFailed } = propertySlice.actions;

export default propertySlice.reducer;
