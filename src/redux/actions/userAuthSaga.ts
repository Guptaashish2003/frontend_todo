import { RootState } from '../../store';
import { takeEvery, put } from 'redux-saga/effects';

import { setUser } from '../reducers/userReducer';

import type { PayloadAction } from '@reduxjs/toolkit';


const selectUser = (state: RootState) => state.user;


function* handleLogin(action: PayloadAction<ReturnType<typeof selectUser>>): Generator<any, void, ReturnType<typeof selectUser>> {
    console.log("Action dispatched: ", action);

    const { payload } = action; // Get user data from the action
    localStorage.setItem("isAuthenticated", "true"); 
    localStorage.setItem("loginUser", JSON.stringify(payload)); // Save user data to localStorage
    yield put(setUser({ ...payload, authenticated: true })); // Update state with authenticated user
  }
  


export function* watchUserActions() {
    yield takeEvery("LOGIN", handleLogin);
}