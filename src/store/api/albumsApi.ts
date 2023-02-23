import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { AlbumT, UserT } from '../index';

import { pauseSuccess } from '../../utils/pause';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/',
    fetchFn: async (...args) => {
      //REMOVE FOR PRODUCTION
      await pauseSuccess(500);
      return fetch(...args);
    },
  }),
  tagTypes: ['Album', 'UsersAlbums'],
  endpoints: (builder) => ({
    fetchAlbums: builder.query<Array<AlbumT>, UserT>({
      providesTags: (result, error, user) => {
        if (result) {
          const albumsTags = result?.map((album) => ({
            type: 'Album' as const,
            id: album.id,
          }));
          return [...albumsTags, { type: 'UsersAlbums', id: user.id }];
        }
        return ['Album', 'UsersAlbums'];
      },
      query: (user) => {
        return {
          url: '/albums',
          params: { userId: user.id },
          method: 'GET',
        };
      },
    }),
    addAlbum: builder.mutation<any, UserT>({
      query: (user) => {
        return {
          url: '/albums',
          method: 'POST',
          body: { userId: user.id, title: faker.commerce.productName() },
        };
      },
      invalidatesTags: (result, error, user) => [
        { type: 'UsersAlbums', id: user.id },
      ],
    }),
    removeAlbum: builder.mutation<any, AlbumT>({
      query: (album) => {
        return {
          url: `/albums/${album.id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, album) => [
        {
          type: 'Album',
          id: album.id,
        },
      ],
    }),
  }),
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
