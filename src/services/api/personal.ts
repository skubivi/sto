import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithRefresh from './base-query-with-refresh';
import { IGetPersonalResponse, TFullPerson, TNewPerson } from '../types/personal';
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
        postPerson: builder.mutation<TFullPerson, TNewPerson>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(
                        personalApi.util.updateQueryData(
                            "getPersonal",
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
        changePersonPassword: builder.mutation<void, {password: string, id: number}>({
            query: (body) => ({
                url: `/${body.id}${PersonalEndpointRoutes.ChangePassword}`,
                method: 'PATCH',
                body: {
                    password: body.password,
                }
            })
        }),
        deletePerson: builder.mutation<void, {id: number}>({
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
    usePostPersonMutation,
    useChangePersonPasswordMutation
} = personalApi;
