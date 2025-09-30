import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithRefresh from "./base-query-with-refresh";
import { CarsEndpointRoutes } from "../routes/endpoints/cars";
import { ECarStatusWithAll, ICar, ICarFilters, ICarForMechanic, ICarToPost } from "../types/cars";

const arrayToString = (f: string[]) => {
    let result = '['
    f.forEach(element => result += `"${element}", `)
    result = result.slice(0, -2)
    result += ']'
    return result
}

const dateToString = (d: Date) => `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`

const getCarsParams = (body: ICarFilters) => {
    const datePart = `?date-from=${dateToString(body.dateFrom)}&date-to=${dateToString(body.dateTo)}`
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
        getMechanicCars: builder.query<{data: ICarForMechanic[]}, void>({
            query: () => ({
                url: CarsEndpointRoutes.ForMechanic
            })
        }),
        postCar: builder.mutation<void, ICarToPost>({
            query: (body) => ({
                url: CarsEndpointRoutes.Create,
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
        }),
        getCarDocuments: builder.query<{data: {id: string, label: string}[]}, {carId: string}>({
            query: (body) => ({
                url: `/${body.carId}${CarsEndpointRoutes.Documents}`
            })
        }),
    }),
});

export const {
    useGetCarsQuery,
    useFinishCarMutation,
    usePostCarMutation,
    useGetCarDocumentsQuery,
    useGetMechanicCarsQuery
 } = carsApi;