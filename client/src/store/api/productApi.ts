import { createApi } from '@reduxjs/toolkit/query/react';
import { DailyData, MonthlyData, baseUrl, extractData } from './shared';

const api = createApi({
  baseQuery: baseUrl,
  tagTypes: ['Products'],
  reducerPath: 'adminProductApi',
  endpoints(build) {
    return {
      getProducts: build.query({
        query: (_arg: void) => '/client/products',
        providesTags: ['Products'],
        transformResponse: extractData<Array<ProductData>>,
      }),
    };
  },
});

interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  catergory: string;
  rating: number;
  supply: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  stat: ProductStatData;
}

interface ProductStatData {
  monthlyData: MonthlyData[];
  productId: string;
  yealySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  dailyData: DailyData;
}

export { api as productApi };
export const { useGetProductsQuery } = api;

export type { ProductData, ProductStatData };
