import { nanoid } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AlbumT, UserT } from '../index';
import { faker } from '@faker-js/faker';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/' }),
  tagTypes: ['Albums'],
  endpoints: (builder) => ({
    addAlbum: builder.mutation<any, UserT>({
      query: (user) => {
        return {
          url: '/albums',
          method: 'POST',
          body: { userId: user.id, title: faker.commerce.productName() },
        };
      },
      invalidatesTags: (result, error, user) => [
        { type: 'Albums', id: user.id },
      ],
    }),
    fetchAlbums: builder.query<Array<AlbumT>, UserT>({
      providesTags: (result, error, user) => [{ type: 'Albums', id: user.id }],
      query: (user) => {
        return {
          url: '/albums',
          params: { userId: user.id },
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
