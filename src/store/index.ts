import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './api/albumsApi';
import { photosApi } from './api/photosApi';

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware),
});

setupListeners(store.dispatch);

//@ts-ignore
window.store = store;

export { store };
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export * from './api/albumsApi';
export * from './api/photosApi';

//Types

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
export type PhotoT = {
  id: string;
  albumId: string;
  url: string;
};

//export * from './thunks/fetchUsers';
// find everything(*) what gets exported in'./thinks/fetchUsers'
// and export it from this (where 'export * from './thunks/fetchUsers' was written )
