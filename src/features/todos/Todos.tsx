import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, toggleTodo } from './todosAPI.js';

function Todos() {
  const [newTodoInput, setNewTodoInput] = useState('');
  const dispatch = useDispatch();
  const { todos, isLoading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = async () => {
    try {
      await dispatch(addTodo(newTodoInput));
      setNewTodoInput('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    await dispatch(deleteTodo(todoId));
  };

  const handleCheckboxChange = async (id) => {
    await dispatch(toggleTodo(id));
  };

  return (
    <>
      <div>
        <div>
          <input
            type="input"
            placeholder="Enter todo title"
            value={newTodoInput}
            onChange={(e) => setNewTodoInput(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <h1>Todo List</h1>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error in loading todos</div>}
        <ul>
          {todos.map((todo) => (
            <div key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={() => handleCheckboxChange(todo.id)} />
                {todo.title}
              </label>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todos;
