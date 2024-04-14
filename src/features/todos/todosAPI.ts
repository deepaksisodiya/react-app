import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:3000/todos/');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const todos = await response.json();
  return todos;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
  const response = await fetch('http://localhost:3000/todos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      completed: false
    })
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  const todos = await response.json();
  return todos;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId: string) => {
  const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return todoId;
});
