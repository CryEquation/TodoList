import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const App: React.FC = () => (
  <div style={{
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#262626',
  }}>
    <div style={{
      maxWidth: 400,
      width: '100%',
      padding: 24,
      border: '1px solid #ccc',
      borderRadius: 8,
      background: '#222',
      boxShadow: '0 4px 24px #0002',
    }}>
      <h1 style={{ color: '#eee', marginBottom: 24 }}>Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  </div>
);

export default App;