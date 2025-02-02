import { createSelector } from 'reselect';
import { RootState } from 'store/store';

import { initialState } from './slice';

const selectApp = (state: RootState) => state.propertyManagement || initialState;

const makeSelectPropertiesLoading = () => createSelector(selectApp, substate => substate.loading);
const makeSelectPropertiesData = () => createSelector(selectApp, substate => substate.properties);
const makeSelectPropertyData = () => createSelector(selectApp, substate => substate.property);

export { makeSelectPropertiesLoading, makeSelectPropertiesData, makeSelectPropertyData };
