import { createApi } from '@reduxjs/toolkit/query/react';
import {
  type DailyData,
  type MonthlyData,
  baseUrl,
  extractData,
} from './shared';

interface SalesQueryResult {
  createdAt: string | Date;
  updatedAt: string | Date;
  monthlyData: Array<MonthlyData>;
  totalCustomers: number;
  yealySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  dailyData: Array<DailyData>;
  salesByCategory: { [category: string]: number };
}

const salesApi = createApi({
  baseQuery: baseUrl,
  tagTypes: ['Sales'],
  reducerPath: 'adminSaleApi',
  endpoints: (build) => ({
    getSale: build.query({
      query: (_arg: void) => `/sales/sales`,
      providesTags: ['Sales'],
      transformResponse: extractData<SalesQueryResult>,
    }),
  }),
});

export { salesApi };
export const { useGetSaleQuery } = salesApi;
