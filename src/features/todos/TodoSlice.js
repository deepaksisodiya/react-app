import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos } from './todosAPI.ts';

const initialState = {
  todos: [],
  isLoading: false,
  error: ''
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodosRedux: (state, action) => {
      state.todos = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
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
      });
  }
});

export const { setTodosRedux, setLoading, setError } = todosSlice.actions;

export default todosSlice.reducer;
