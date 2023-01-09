import { createApi } from '@reduxjs/toolkit/query/react';
import {
  FetchResponseFailBase,
  FetchResponsePassBase,
  baseUrl,
} from './shared';

const api = createApi({
  baseQuery: baseUrl,
  tagTypes: ['Products'],
  reducerPath: 'adminProductApi',
  endpoints(build) {
    return {
      getProducts: build.query<Array<ProductData>, void>({
        query: () => '/client/products',
        providesTags: ['Products'],
        transformResponse: (result: ProductQueryResponsePass) => result.data,
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
  monthlyData: {
    month: string;
    totalSales: number;
    totalUnits: number;
  }[];
  productId: string;
  yealySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  dailyData: {
    day: string;
    totalSales: number;
    totalUnits: number;
  };
}

interface ProductQueryResponsePass extends FetchResponsePassBase {
  data: Array<ProductData>;
}

interface ProductQueryResponseReject extends FetchResponseFailBase {
  error: { message: unknown };
}

type ProductQueryResponse =
  | ProductQueryResponsePass
  | ProductQueryResponseReject;

export { api as productApi };
export const { useGetProductsQuery } = api;

export type {
  ProductData,
  ProductStatData,
  ProductQueryResponse as ProductQueryResult,
};
