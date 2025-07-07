import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: TodoState = {
  todos: loadTodos(),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    moveTodo: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const todos = state.todos;
      if (from === to || from < 0 || to < 0 || from >= todos.length || to >= todos.length) return;
      const [removed] = todos.splice(from, 1);
      todos.splice(to, 0, removed);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, editTodo, moveTodo } = todoSlice.actions;
export default todoSlice.reducer;