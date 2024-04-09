import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { setTodosRedux } from './todoSlice.js';

function App() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState('');
  const dispatch = useDispatch();
  const todosStore = useSelector((state) => state.todos.todos);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/todos/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        dispatch(setTodosRedux(responseData));
      } catch (error) {
        setError('Error in loading todo');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodoInput,
          completed: false,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      const newTodo = await response.json();
      dispatch(setTodosRedux([...todosStore, newTodo]));
      setNewTodoInput('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      dispatch(setTodosRedux(todosStore.filter(todo => todo.id !== todoId)));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCheckboxChange = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !completed
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      dispatch(setTodosRedux(todosStore.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !completed };
        }
        return todo;
      })));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const renderAddTodo = () => {
    return (
      <div>
        <input 
          type='input'
          placeholder="Enter todo title"
          value={newTodoInput}
          onChange={e => setNewTodoInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error in loading todos</div>;
  }

  return (
    <>
      <div>
        { renderAddTodo() }
        <h1>Todo List</h1>
        <ul>
          {todosStore.map(todo => (
            <div key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                {todo.title}
              </label>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
