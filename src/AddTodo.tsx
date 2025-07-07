import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todoSlice';
import type { AppDispatch } from './store';

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Новая задача"
        style={{ padding: 8, width: 200 }}
      />
      <button type="submit" style={{ marginLeft: 8, padding: 8 }}>
        Добавить
      </button>
    </form>
  );
};

export default AddTodo;