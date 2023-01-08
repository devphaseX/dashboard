import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ['User'],
  reducerPath: 'adminApi',
  endpoints(build) {
    return {
      getUser: build.query({
        query: (id: string) => `/general/user/${id}`,
        providesTags: ['User'],
      }),
    };
  },
});

export { api };
export const { useGetUserQuery } = api;
