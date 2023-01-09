import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL });

export { baseUrl };

interface FetchResponsePassBase {
  status: 'success';
  data: unknown;
}

interface FetchResponseFailBase {
  status: 'failed';
  error: unknown;
}

type FetchResponseBase = FetchResponsePassBase | FetchResponseFailBase;

export type { FetchResponseBase, FetchResponseFailBase, FetchResponsePassBase };
