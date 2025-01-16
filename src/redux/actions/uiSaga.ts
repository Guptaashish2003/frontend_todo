import { RootState } from '../../store';
import { takeEvery, put, select } from 'redux-saga/effects';

import { toggleDarkMode,toggleListView } from '../reducers/uiReducer';

import { type PayloadAction } from '@reduxjs/toolkit';

const uiInput = (state:RootState) => state.uiInputs
// export const toggleDarkMode = createAction<boolean>('ui/toggleDarkMode');

// export const toggleListView = createAction<boolean>('ui/toggleListView');



function* handleToggleUiInput (action:PayloadAction<ReturnType<typeof uiInput>>){
    const {payload} =  action
    yield put(toggleDarkMode(payload.DarkMode));
    yield put(toggleListView(payload.listView));

}

export function* watchUiInputs (){
    yield takeEvery("DARK_MODE",handleToggleUiInput)
    yield takeEvery("LIST_VIEW",handleToggleUiInput)
}