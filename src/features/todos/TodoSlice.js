import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, addTodo, deleteTodo, toggleTodo } from './todosAPI.ts';

const initialState = {
  todos: [],
  isLoading: false,
  error: ''
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos = [...state.todos, action.payload];
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        });
      });
  }
});

export default todosSlice.reducer;
