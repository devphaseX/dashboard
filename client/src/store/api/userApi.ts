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
  tagTypes: ['User', 'Customers'],
  reducerPath: 'adminUserApi',
  endpoints(build) {
    return {
      getUser: build.query<UserClientData | null, string>({
        query: (id: string) => `/general/user/${id}`,
        providesTags: ['User'],
        transformResponse: extractData,
      }),

      getCustomers: build.query<Array<UserClientData>, void>({
        query: (_arg: void) => 'client/customers',
        providesTags: ['Customers'],
        transformResponse: extractData,
      }),
    };
  },
});

export { api as userApi };
export const { useGetUserQuery, useGetCustomersQuery } = api;
export type { UserClientData };
