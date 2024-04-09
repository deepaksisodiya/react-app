import { createSlice } from '@reduxjs/toolkit';

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
      state.isLoading = action.isLoading;
    },
    setError: (state, action) => {
      state.error = action.error
    },
  },
});

export const { setTodosRedux, setLoading, setError } = todosSlice.actions;

export default todosSlice.reducer