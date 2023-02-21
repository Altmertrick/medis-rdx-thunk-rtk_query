import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './api/albumsApi';

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumsApi.middleware),
});

setupListeners(store.dispatch);

//@ts-ignore
window.store = store;

export { store };
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export * from './api/albumsApi';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AlbumT = {
  id: string;
  title: string;
  userId: string;
};
export type UserT = {
  id: string;
  name: string;
};

//export * from './thunks/fetchUsers';
// find everything(*) what gets exported in'./thinks/fetchUsers'
// and export it from this (where 'export * from './thunks/fetchUsers' was written )
