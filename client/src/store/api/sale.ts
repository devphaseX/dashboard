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
  monthlyData: MonthlyData;
  totalCustomers: number;
  yealySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  dailyData: DailyData;
  salesByCategory: any;
}

const salesApi = createApi({
  baseQuery: baseUrl,
  tagTypes: ['Sales'],
  reducerPath: 'adminSaleApi',
  endpoints: (build) => ({
    getSale: build.query({
      query: (_arg: void) => `/sales`,
      providesTags: ['Sales'],
      transformResponse: extractData<SalesQueryResult>,
    }),
  }),
});

export { salesApi };
export const { useGetSaleQuery } = salesApi;
