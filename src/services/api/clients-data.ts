import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithRefresh from './base-query-with-refresh';
import { ClientsEndpointRoutes } from '../routes/endpoints/clients-data';
import { IClientData } from '../types/clients-data';

export const clientsDataApi = createApi({
  reducerPath: 'clientsDataApi',
  baseQuery: baseQueryWithRefresh({ url: ClientsEndpointRoutes.Base }),
  endpoints: (builder) => ({
    getClientsData: builder.query<IClientData, {id: string}>({
      query: (body) => ({
        url: `/${body.id}`,
      }),
    }),
  }),
});

export const { 
    useLazyGetClientsDataQuery,
    useGetClientsDataQuery,
} = clientsDataApi;
