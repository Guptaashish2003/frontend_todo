import { takeEvery, put, select } from 'redux-saga/effects';

import { deleteTodo, addTodo, toggleComplete, updateTodo, loadTodosFromStorage } from '../reducers/todoReducer';
import { RootState } from '../../store';
// Selector to get the current state
const selectTodos = (state: RootState) => state.todos.todos;

// Load todos from localStorage
function* handleLoadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    const todos = JSON.parse(storedTodos);
    for (const todo of todos) {
      yield put(addTodo(todo)); // Dispatch addTodo for each todo
    }
  }
}

// Save todos to localStorage
function* handleSaveTodos(): Generator<any, void, ReturnType<typeof selectTodos>> {
  const todos: ReturnType<typeof selectTodos> = yield select(selectTodos);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Watcher Sagas
export function* watchTodoActions() {
  yield takeEvery(loadTodosFromStorage.type, handleLoadTodos);
  yield takeEvery([addTodo.type, deleteTodo.type, updateTodo.type, toggleComplete.type], handleSaveTodos);
}
