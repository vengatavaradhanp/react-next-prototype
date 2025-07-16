/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { extra }: any) => {
      // Get token from cookies instead of localStorage
      // On the server, you can access cookies via extra.request.cookies
      // On the client, use document.cookie
      let token = '';
      if (typeof window === 'undefined' && extra?.request?.cookies) {
        token = extra.request.cookies.get('token')?.value || '';
      } else if (typeof document !== 'undefined') {
        const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
        token = match ? match[2] : '';
      }
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    get: builder.query<unknown, string>({
      query: (url) => url,
    }),
    post: builder.mutation<unknown, { url: string; body: unknown }>({
      query: ({ url, body }) => ({
        url,
        method: 'POST',
        body,
      }),
    }),
    put: builder.mutation<unknown, { url: string; body: unknown }>({
      query: ({ url, body }) => ({
        url,
        method: 'PUT',
        body,
      }),
    }),
    remove: builder.mutation<unknown, string>({
      query: (url) => ({
        url,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetQuery, usePostMutation, usePutMutation, useRemoveMutation } = apiSlice;