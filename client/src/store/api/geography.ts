import { createApi } from '@reduxjs/toolkit/query/react';
import { baseUrl, extractData } from './shared';

interface GeographyData {
  field: string;
  value: string;
}

const api = createApi({
  baseQuery: baseUrl,
  tagTypes: ['Geography'],
  reducerPath: 'adminGeographyApi',
  endpoints(build) {
    return {
      getGeography: build.query<Array<GeographyData>, void>({
        query: (_arg: void) => '/client/geography',
        providesTags: ['Geography'],
        transformResponse: extractData,
      }),
    };
  },
});

export { api as geographyApi };
export const { useGetGeographyQuery } = api;
