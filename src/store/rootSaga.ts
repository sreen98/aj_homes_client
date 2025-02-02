import { all } from 'redux-saga/effects';

import appManagementWatcherSaga from 'pages/AppManagement/saga';
import propertyManagementWatcherSaga from 'pages/PropertyManagement/saga';
import homeManagementWatcherSaga from 'pages/HomePageManagement/saga';
import enquiryManagementWatcherSaga from 'pages/EnquiryManagement/saga';

export function* rootSaga() {
  yield all([
    appManagementWatcherSaga(),
    propertyManagementWatcherSaga(),
    homeManagementWatcherSaga(),
    enquiryManagementWatcherSaga()
  ]);
}

export default rootSaga;
