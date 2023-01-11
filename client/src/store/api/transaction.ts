import { createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl, extractData } from './shared';

interface TransactionData {
  createdAt: any;
  updatedAt: any;
  products: any;
  userId: any;
  cost: any;
}

type TransactionKey = keyof TransactionData;

type TransactionSortField =
  | `{field: ${TransactionSortObject['field']}, method: ${TransactionSortObject['method']}}`
  | null;

type TransactionSortObject = { field: TransactionKey; method: 'desc' | 'asc' };

interface TransactionRequestQuery {
  page?: number;
  pageSize?: number;
  sort?: TransactionSortField;
  search?: string;
}

type TransactionQueryData = {
  transactions: Array<TransactionData>;
  count: number;
};

const api = createApi({
  baseQuery: baseUrl,
  reducerPath: 'adminTransactionApi',
  tagTypes: ['Transactions'],
  endpoints(build) {
    return {
      getTransaction: build.query({
        query: ({
          page,
          pageSize,
          search,
          sort,
        }: TransactionRequestQuery = {}) => ({
          url: 'client/transactions',
          method: 'GET',
          params: { page, pageSize, search, sort },
        }),
        providesTags: ['Transactions'],
        transformResponse: extractData<TransactionQueryData>,
      }),
    };
  },
});

export { api as transactionApi };

export const { useGetTransactionQuery } = api;
export type {
  TransactionSortObject,
  TransactionSortField,
  TransactionRequestQuery,
  TransactionData,
};
