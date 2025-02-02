import { put, call } from 'redux-saga/effects';

import * as AppActions from 'pages/AppManagement/slice';
import { IStatusHandler } from 'types';

export function* statusHandlerSaga(data: IStatusHandler) {
  try {
    yield put(AppActions.showStatusMessage(data));
  } catch (e) {
    yield put(AppActions.closeStatusMessage());
  }
}

export function* errorHandlerSaga(
  error: any,
  failedAction?: (error: any) => { type: any; payload: any },
  shouldShowToaster = true
) {
  if (shouldShowToaster) {
    yield call(statusHandlerSaga, { type: 'error', message: error.response.data.message ?? 'Something went wrong!' });
  }
  if (failedAction) {
    yield put(failedAction(error.message));
  }
}
