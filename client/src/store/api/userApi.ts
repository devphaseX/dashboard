import { createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './shared';

const api = createApi({
  baseQuery: baseUrl,
  tagTypes: ['User', 'Products'],
  reducerPath: 'adminUserApi',
  endpoints(build) {
    return {
      getUser: build.query({
        query: (id: string) => `/general/user/${id}`,
        providesTags: ['User'],
      }),
    };
  },
});

export { api as userApi };
export const { useGetUserQuery } = api;
