import { combineReducers } from '@reduxjs/toolkit';
import { Env } from 'config';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

import appReducer from 'pages/AppManagement/slice';
import propertyReducer from 'pages/PropertyManagement/slice';
import homeReducer from 'pages/HomePageManagement/slice';
import enquiryReducer from 'pages/EnquiryManagement/slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: Env.isDev(),
  savePreviousLocations: 1
});

export const rootReducer = combineReducers({
  router: routerReducer,
  appManagement: appReducer,
  propertyManagement: propertyReducer,
  homeManagement: homeReducer,
  enquiryManagement: enquiryReducer
});

export { routerMiddleware, createReduxHistory };
