import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchTodoActions } from './redux/actions/todoSaga';
import todoReducer from './redux/reducers/todoReducer';
import userReducer from './redux/reducers/userReducer';
import { watchUserActions } from './redux/actions/userAuthSaga';
import uiReducer from "./redux/reducers/uiReducer"
import { watchUiInputs } from './redux/actions/uiSaga';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
    uiInputs:uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchTodoActions);
sagaMiddleware.run(watchUserActions);
sagaMiddleware.run(watchUiInputs);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
