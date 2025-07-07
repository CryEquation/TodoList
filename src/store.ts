import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import type { Middleware } from '@reduxjs/toolkit';

const saveTodos = (todos: any) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch {}
};

interface RootStore {
  todos: {
    todos: any[];
  };
}

const localStorageMiddleware: Middleware<{}, RootStore> = store => next => action => {
  const result = next(action);
  const state = store.getState();
  saveTodos(state.todos.todos);
  return result;
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

// Типы для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;