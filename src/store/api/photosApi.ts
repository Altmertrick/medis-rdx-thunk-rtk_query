import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AlbumT, PhotoT } from '..';
import { faker } from '@faker-js/faker';

export const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/',
  }),
  tagTypes: ['Photo', 'AlbumsPhotos'],
  endpoints: (builder) => ({
    fetchPhotos: builder.query<Array<PhotoT>, AlbumT>({
      providesTags: (result, error, album) => {
        if (result) {
          const photosTags = result.map((photo) => {
            return { type: 'Photo' as const, id: photo.id };
          });
          return [...photosTags, { type: 'AlbumsPhotos', id: album.id }];
        }
        return ['Photo', 'AlbumsPhotos'];
      },
      query: (album) => ({
        method: 'GET',
        url: '/photos',
        params: { albumId: album.id },
      }),
    }),
    addPhoto: builder.mutation<any, AlbumT>({
      query: (album) => ({
        method: 'POST',
        url: '/photos',
        body: {
          albumId: album.id,
          url: faker.image.abstract(150, 150, true),
        },
      }),
      invalidatesTags: (result, error, album) => {
        return [{ type: 'AlbumsPhotos', id: album.id }];
      },
    }),
    removePhoto: builder.mutation<any, PhotoT>({
      query: (photo) => ({
        method: 'DELETE',
        url: `/photos/${photo.id}`,
      }),
      invalidatesTags: (result, error, photo) => {
        return [{ type: 'Photo', id: photo.id }];
      },
    }),
  }),
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
