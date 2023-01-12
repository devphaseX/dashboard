import { createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl, extractData } from './shared';
import { TransactionData } from './transaction';

interface UserClientData {
  _id: string;
  name: string;
  email: string;
  transactions: TransactionData[];
  role: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const api = createApi({
  baseQuery: baseUrl,
  tagTypes: ['User', 'Customers', 'Admin'],
  reducerPath: 'adminUserApi',
  endpoints(build) {
    return {
      getUser: build.query({
        query: (id: string) => `/general/user/${id}`,
        providesTags: ['User'],
        transformResponse: extractData<UserClientData | null>,
      }),

      getCustomers: build.query({
        query: (_arg: void) => 'client/customers',
        providesTags: ['Customers'],
        transformResponse: extractData<Array<UserClientData>>,
      }),

      getAdmins: build.query({
        query: (_arg: void) => '/management/admin',
        providesTags: ['Admin'],
        transformResponse: extractData<Array<UserClientData>>,
      }),
    };
  },
});

export { api as userApi };
export const { useGetUserQuery, useGetCustomersQuery, useGetAdminsQuery } = api;
export type { UserClientData };
