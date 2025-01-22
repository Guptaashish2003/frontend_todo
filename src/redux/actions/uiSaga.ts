
import { takeEvery, put } from 'redux-saga/effects';
import { toggleDarkMode, toggleListView } from '../reducers/uiReducer';
import { type PayloadAction } from '@reduxjs/toolkit';

// Saga to handle UI input actions
function* handleToggleUiInput(action: PayloadAction<{ DarkMode?: boolean; listView?: boolean }>) {
  const { payload } = action;

  // Dispatch toggle actions based on payload
  if (payload.DarkMode !== undefined) {
    yield put(toggleDarkMode(payload.DarkMode)); // Update DarkMode
  }

  if (payload.listView !== undefined) {
    yield put(toggleListView(payload.listView)); // Update listView
  }
}

// Watcher saga for UI input actions
export function* watchUiInputs() {
  yield takeEvery("DARK_MODE", handleToggleUiInput); // Listen for DARK_MODE action
  yield takeEvery("LIST_VIEW", handleToggleUiInput); // Listen for LIST_VIEW action
}
