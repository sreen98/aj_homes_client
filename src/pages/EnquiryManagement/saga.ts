import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import * as Endpoints from './endpoint';
import { errorHandlerSaga, statusHandlerSaga } from 'utils';

import * as Actions from './slice';
import { RequestSagaParams, ResponseGenerator } from 'types';

export function* createEnquiry(data: RequestSagaParams) {
  try {
    const response: ResponseGenerator = yield call(Endpoints.createEnquiry, data.payload);
    yield put(Actions.createEnquirySuccess(response.data.data));
    yield call(statusHandlerSaga, { message: 'Successfully added Enquiry!' });
  } catch (error: any) {
    yield call(errorHandlerSaga, error, Actions.createEnquiryFailed);
  }
}

export function* enquiryManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.createEnquiry.type, createEnquiry)]);
}

export default enquiryManagementWatcherSaga;
