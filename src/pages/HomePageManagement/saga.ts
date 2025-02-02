import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoints';
import { errorHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams, ResponseGenerator } from 'types';

export function* getAllProperties(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.getAllProperties, data);
    yield put(Actions.getAllPropertiesSuccess(response.data.data));
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.getAllPropertiesFailed);
  }
}

export function* homeManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.getAllProperties.type, getAllProperties)]);
}

export default homeManagementWatcherSaga;
