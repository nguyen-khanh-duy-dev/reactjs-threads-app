import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/api/posts/feed`,
      transformResponse: (response) => response.data,
    }),
  }),
  refetchOnReconnect: true,
});

export const { useGetPostsQuery } = postsApi;
