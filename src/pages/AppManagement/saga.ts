import { SagaIterator } from '@redux-saga/core';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import * as Actions from './slice';
import * as Endpoints from './endpoints';
import { localRedirect } from 'utils';

export function* getUserDetails(): SagaIterator {
  try {
    const response = yield call(Endpoints.getUserData);
    yield put(Actions.fetchUserSuccess(response.data));
  } catch (error) {
    yield put(Actions.fetchUserFailure(error));
  }
}

export function* getSiteStatus(): SagaIterator {
  try {
    const response = yield call(Endpoints.getSiteStatus);
    if (response?.data?.isMaintenance) {
      localRedirect('/maintenance');
    }
    Actions.getSiteStatusSuccess(response);
  } catch (error) {
    Actions.getSiteStatusFailure(error);
    throw error;
  }
}

export function* appManagementWatcherSaga(): SagaIterator {
  yield all([yield takeLatest(Actions.fetchUser.type, getUserDetails)]);
  yield all([yield takeLatest(Actions.getSiteStatus.type, getSiteStatus)]);
}

export default appManagementWatcherSaga;
