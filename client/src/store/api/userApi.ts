import { createApi } from '@reduxjs/toolkit/query/react';
import {
  FetchResponseFailBase,
  FetchResponsePassBase,
  baseUrl,
  extractData,
} from './shared';

interface UserClientData {
  _id: string;
  name: string;
  email: string;
  transactions: any[];
  role: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface GetCustomersResponsePass extends FetchResponsePassBase {
  data: Array<UserClientData>;
}

interface GetCustomersResponseReject extends FetchResponseFailBase {
  error: { message: unknown };
}

type GetCustomersResponse =
  | GetCustomersResponsePass
  | GetCustomersResponseReject;

const api = createApi({
  baseQuery: baseUrl,
  tagTypes: ['User', 'Customers'],
  reducerPath: 'adminUserApi',
  endpoints(build) {
    return {
      getUser: build.query({
        query: (id: string) => `/general/user/${id}`,
        providesTags: ['User'],
        transformResponse: extractData<UserClientData | null>,
      }),

      getCustomers: build.query<Array<UserClientData>, void>({
        query: () => 'client/customers',
        providesTags: ['Customers'],
        transformResponse: extractData<Array<UserClientData>>,
      }),
    };
  },
});

export { api as userApi };
export const { useGetUserQuery, useGetCustomersQuery } = api;
export type { GetCustomersResponse, UserClientData };
