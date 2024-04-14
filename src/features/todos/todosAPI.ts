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

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (todoId: string, { getState, dispatch }) => {
  const currentState = getState();
  const todo = currentState.todos.todos.find((todo) => todo.id === todoId);

  if (!todo) {
    throw new Error('Todo not found');
  }

  const updatedTodo = { ...todo, completed: !todo.completed };

  const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTodo)
  });

  if (!response.ok) {
    throw new Error('Failed to toggle todo');
  }

  const updatedTodoFromAPI = await response.json();

  return updatedTodoFromAPI;
});
