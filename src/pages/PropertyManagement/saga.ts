import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoint';
import { errorHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams, ResponseGenerator } from 'types';

export function* getAllProperties(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.getAllProperties, data.payload);
    yield put(Actions.getAllPropertiesSuccess(response.data.data));
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.getAllPropertiesFailed);
  }
}

export function* getFilteredProperties(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.getFilteredProperties, data.payload);
    yield put(Actions.getFilteredPropertiesSuccess(response.data.data));
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.getFilteredPropertiesFailed);
  }
}

export function* getPropertyDetails(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.getPropertyDetails, data.payload);
    yield put(Actions.getPropertyDetailsSuccess(response.data.data));
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.getPropertyDetailsFailed);
  }
}

export function* propertyManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.getAllProperties.type, getAllProperties)]);
  yield all([yield takeLatest(Actions.getFilteredProperties.type, getFilteredProperties)]);
  yield all([yield takeLatest(Actions.getPropertyDetails.type, getPropertyDetails)]);
}

export default propertyManagementWatcherSaga;
