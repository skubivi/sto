import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithRefresh from './base-query-with-refresh';
import { getCookie } from '../utils/helper-functions/cookie';
import { UserEndpointRoutes } from '../routes/endpoints/user';
import { IPersonal, IUserResponse } from '../types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithRefresh({ url: UserEndpointRoutes.Base }),
  tagTypes: ['User', 'Role'],
  endpoints: (builder) => ({
    getMe: builder.query<IUserResponse | null, void>({
      query: () => ({
        url: UserEndpointRoutes.Me,
        headers: { authorization: getCookie('accessToken') },
      }),
      providesTags: ['User'],
    }),
    getPersonalData: builder.query<IPersonal, void>({
      query: () => ({
        url: UserEndpointRoutes.Personal,
      })
    }),
    getUserPersonalData: builder.query<IPersonal, {id: string}>({
      query: (body) => ({
        url: `/${body.id}${UserEndpointRoutes.Personal}`
      })
    }),
    patchPersonalData: builder.mutation<void, IPersonal>({
      query: (body) => ({
        url: UserEndpointRoutes.Personal,
        method: 'PUT',
        body
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            userApi.util.updateQueryData(
              "getPersonalData",
              undefined,
              (state) => {
                state.firstName = args.firstName
                state.lastName = args.lastName
                state.middleName = args.middleName
              }
            )
          )
        // eslint-disable-next-line no-empty
        } catch {}
      }
    })
  }),
});

export const { 
  useGetMeQuery,
  useGetPersonalDataQuery,
  usePatchPersonalDataMutation,
  useLazyGetUserPersonalDataQuery,
  useGetUserPersonalDataQuery,
  useLazyGetPersonalDataQuery
} = userApi;
