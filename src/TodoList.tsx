import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { toggleTodo, removeTodo, editTodo, moveTodo } from './todoSlice';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

type Filter = 'all' | 'completed' | 'active';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const startEdit = (id: string, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const from = result.source.index;
    const to = result.destination.index;
    if (from !== to) {
      dispatch(moveTodo({ from, to }));
    }
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setFilter('all')}
          style={{ marginRight: 8, padding: '4px 12px', background: filter === 'all' ? '#444' : '#222', color: '#fff', border: '1px solid #333', borderRadius: 4 }}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{ marginRight: 8, padding: '4px 12px', background: filter === 'active' ? '#444' : '#222', color: '#fff', border: '1px solid #333', borderRadius: 4 }}
        >
          Активные
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{ padding: '4px 12px', background: filter === 'completed' ? '#444' : '#222', color: '#fff', border: '1px solid #333', borderRadius: 4 }}
        >
          Выполненные
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <ul
              style={{ listStyle: 'none', padding: 0 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        marginBottom: 8,
                        background: snapshot.isDragging ? '#333' : 'transparent',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {editId === todo.id ? (
                        <>
                          <input
                            type="text"
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            style={{ padding: 4, marginRight: 8 }}
                          />
                          <button onClick={() => saveEdit(todo.id)} style={{ marginRight: 8 }}>
                            Сохранить
                          </button>
                          <button onClick={() => setEditId(null)}>
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <span
                            onClick={() => dispatch(toggleTodo(todo.id))}
                            style={{
                              textDecoration: todo.completed ? 'line-through' : 'none',
                              cursor: 'pointer',
                              marginRight: 16,
                            }}
                          >
                            {todo.text}
                          </span>
                          <button onClick={() => startEdit(todo.id, todo.text)} style={{ marginRight: 8 }}>
                            Редактировать
                          </button>
                          <button onClick={() => dispatch(removeTodo(todo.id))}>
                            Удалить
                          </button>
                        </>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TodoList;