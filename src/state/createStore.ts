import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';

export const createStore = () => {
  return configureStore({ reducer: appReducer });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
