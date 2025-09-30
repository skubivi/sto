import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithRefresh from './base-query-with-refresh';
import { IGetPersonalResponse } from '../types/personal';
import { PersonalEndpointRoutes } from '../routes/endpoints/personal';

export const personalApi = createApi({
    reducerPath: 'personalApi',
    baseQuery: baseQueryWithRefresh({ url: PersonalEndpointRoutes.Base }),
    endpoints: (builder) => ({
        getPersonal: builder.query<IGetPersonalResponse, void>({
            query: () => ({
                url: '/'
            })
        }),
        changePersonPassword: builder.mutation<void, {password: string, id: string}>({
            query: (body) => ({
                url: `/${body.id}${PersonalEndpointRoutes.ChangePassword}`,
                method: 'PATCH',
                body: {
                    password: body.password,
                }
            })
        }),
        deletePerson: builder.mutation<void, {id: string}>({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                    dispatch(
                        personalApi.util.updateQueryData(
                            "getPersonal",
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
    useDeletePersonMutation,
    useGetPersonalQuery,
    useChangePersonPasswordMutation
} = personalApi;
