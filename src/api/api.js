import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (id) => `posts/${id}`,
    }),
    getPosts: builder.query({
      query: ({ page = 1, limit = 10 }) => `posts?_page=${page}&_limit=${limit}`,
    }),
    getUserPosts: builder.query({
      query: (userId) => `posts?userId=${userId}`,
    }),
    getUserDetails: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    getComments: builder.query({
      query: (postId) => `posts/${postId}/comments`,
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useGetUserPostsQuery,
  useGetUserDetailsQuery,
  useGetCommentsQuery,
} = api;
