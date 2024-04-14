import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, toggleTodo } from './todosAPI.js';

function Todos() {
  const [newTodoInput, setNewTodoInput] = useState('');
  const dispatch = useDispatch();
  const todosStore = useSelector((state) => state.todos.todos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

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

  const handleDeleteTodo = async (todoId: string) => {
    await dispatch(deleteTodo(todoId));
  };

  const handleCheckboxChange = async (id) => {
    await dispatch(toggleTodo(id));
  };

  const renderAddTodo = () => {
    return (
      <div>
        <input
          type="input"
          placeholder="Enter todo title"
          value={newTodoInput}
          onChange={(e) => setNewTodoInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error in loading todos</div>;
  }

  return (
    <>
      <div>
        {renderAddTodo()}
        <h1>Todo List</h1>
        <ul>
          {todosStore.map((todo) => (
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
