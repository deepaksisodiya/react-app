import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/TodoSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});
