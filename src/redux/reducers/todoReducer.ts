import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {Todo} from '../../components/Todo';

interface TodoState {
  todos: Todo[];
  userId: number | null;
}

const initialState: TodoState = {
  todos: [],
  userId: 0,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    toggleComplete(state, action: PayloadAction<number>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      console.log("updatedodo",todo)
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      console.log("updateTodo",action.payload,"index",index)
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    loadTodosFromStorage(state, action: PayloadAction<Todo[]>) {
        state.todos = action.payload;
    }

  },
});

export const {addTodo, toggleComplete, deleteTodo, updateTodo,loadTodosFromStorage } = todoSlice.actions;
export default todoSlice.reducer;
