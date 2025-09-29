import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithRefresh from "./base-query-with-refresh";
import { CarsEndpointRoutes } from "../routes/endpoints/cars";
import { ECarStatusWithAll, ICar, ICarFilters, ICarToPost } from "../types/cars";

const arrayToString = (f: string[]) => {
    let result = ''
    f.forEach(element => result += `${element}_`)
    result = result.slice(0, -1)
    return result
}

const getCarsParams = (body: ICarFilters) => {
    const datePart = `?date-from=${body.dateFrom}&date-to=${body.dateTo}`
    const receptionistPart = body.receptionists.length > 0
        ? `&receptionists=${arrayToString(body.receptionists)}`
        : ''
    const statusPart = body.status === ECarStatusWithAll.All 
        ? '' 
        : `&status=${body.status}`
    return datePart + receptionistPart + statusPart
}

export const carsApi = createApi({
    reducerPath: "carsApi",
    baseQuery: baseQueryWithRefresh({ url: CarsEndpointRoutes.Base }),
    tagTypes: ["Cars"],
    endpoints: (builder) => ({
        getCars: builder.query<{data: ICar[]}, ICarFilters>({
            query: (body) => ({
                url: getCarsParams(body)
            }),
            providesTags: ["Cars"]
        }),
        postCar: builder.mutation<void, ICarToPost>({
            query: (body) => ({
                url: '',
                method: 'POST',
                body
            }),
            invalidatesTags: ["Cars"]
        }),
        finishCar: builder.mutation<void, {carId: string}>({
            query: (body) => ({
                url: `/${body.carId}${CarsEndpointRoutes.Finish}`,
                method: 'PATCH'
            }),
            invalidatesTags: ["Cars"]
        })
    }),
});

export const {
    useGetCarsQuery,
    useFinishCarMutation,
    usePostCarMutation
 } = carsApi;