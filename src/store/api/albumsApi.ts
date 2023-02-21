import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AlbumT, UserT } from '../index';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/' }),
  endpoints: (builder) => ({
    fetchAlbums: builder.query<Array<AlbumT>, UserT>({
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

export const { useFetchAlbumsQuery } = albumsApi;
