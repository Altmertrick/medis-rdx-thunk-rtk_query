import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

//@ts-ignore
window.store = store;

export { store };
export * from './thunks/fetchUsers';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export * from './thunks/fetchUsers';
// find everything(*) what gets exported in'./thinks/fetchUsers'
// and export it from this (where 'export * from './thunks/fetchUsers' was written )
