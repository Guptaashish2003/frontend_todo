import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: string;
  dueDate: string;
  Repeat: boolean;
  notes: string;
}

interface TodoState {
  todos: Todo[];
  userId: string | null;
}

const initialState: TodoState = {
  todos: [],
  userId: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    toggleComplete(state, action: PayloadAction<number>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    loadTodosFromStorage(state, action: PayloadAction<Todo[]>) {
        state.todos = action.payload;
    }

  },
});

export const { setUserId, addTodo, toggleComplete, deleteTodo, updateTodo,loadTodosFromStorage } = todoSlice.actions;
export default todoSlice.reducer;
