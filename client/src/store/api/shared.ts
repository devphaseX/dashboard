import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL });

const extractData = <R>(responseData: InferFetchResponsePassData<R>): R =>
  responseData.data;
interface FetchResponsePassBase {
  status: 'success';
  data: unknown;
}

interface InferFetchResponsePassData<T> extends FetchResponsePassBase {
  data: T;
}

interface FetchResponseFailBase {
  status: 'failed';
  error: unknown;
}

type FetchResponseBase = FetchResponsePassBase | FetchResponseFailBase;
export { baseUrl, extractData };

export type { FetchResponseBase, FetchResponseFailBase, FetchResponsePassBase };
