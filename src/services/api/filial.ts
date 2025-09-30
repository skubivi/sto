import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithRefresh from './base-query-with-refresh';
import { IFilial, IGetFilialsResponse, TFilialWithId } from '../types/filial';
import { FilialEndpointRoutes } from '../routes/endpoints/filial';

export const filialApi = createApi({
    reducerPath: 'filialApi',
    baseQuery: baseQueryWithRefresh({ url: FilialEndpointRoutes.Base }),
    endpoints: (builder) => ({
        getFilials: builder.query<IGetFilialsResponse, void>({
            query: () => ({
                url: FilialEndpointRoutes.List
            })
        }),
        getMyFilial: builder.query<{id: string}, void>({
            query: () => ({
                url: FilialEndpointRoutes.My
            })
        }),
        getFilial: builder.query<TFilialWithId, {id: string}>({
            query: (body) => ({
                url: `/${body.id}`
            })
        }),
        postFilial: builder.mutation<TFilialWithId, IFilial>({
            query: (body) => ({
                url: FilialEndpointRoutes.Create,
                method: 'POST',
                body
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(
                        filialApi.util.updateQueryData(
                            "getFilials",
                            undefined,
                            (state) => {
                                state.data.push(data)
                            }
                        )
                    )
                // eslint-disable-next-line no-empty
                } catch {}
            }
        }),
        patchFilial: builder.mutation<void, {id: string, title: string}>({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'PATCH',
                body: {
                    title: body.title
                }
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                    dispatch(
                        filialApi.util.updateQueryData(
                            "getFilials",
                            undefined,
                            (state) => {
                                const filialIndex = state.data.findIndex(el => el.id === args.id)
                                if (filialIndex !== -1)
                                    state.data[filialIndex].title = args.title
                            }
                        )
                    )
                // eslint-disable-next-line no-empty
                } catch {}
            }
        }),
        deleteFilial: builder.mutation<void, {id: string}>({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                    dispatch(
                        filialApi.util.updateQueryData(
                            "getFilials",
                            undefined,
                            (state) => {
                                const filialIndex = state.data.findIndex(el => el.id === args.id)
                                if (filialIndex !== -1)
                                    state.data.splice(filialIndex, 1)
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
  useGetFilialsQuery,
  usePostFilialMutation,
  usePatchFilialMutation,
  useDeleteFilialMutation,
  useLazyGetFilialQuery,
  useGetFilialQuery,
  useGetMyFilialQuery
} = filialApi;
