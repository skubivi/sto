import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithRefresh from "./base-query-with-refresh";
import { AnalyticsEndpointRoutes } from "../routes/endpoints/analytics";
import { IMechanicFilialReport, IMechanicFilialReportFilters, IMechanicReport, IMechanicReportFilters, IReceptionistFilialReport, IReceptionistFilialReportFilters, IReceptionistReport, IReceptionistReportFilters } from "../types/analytics";

const arrayToString = (f: number[]) => {
    let result = ''
    f.forEach(element => result += `${element}_`)
    result = result.slice(0, -1)
    return result
}

const getDatePart = (from: string, to: string) => `?date-from=${from}&date-to=${to}`

const getMechanicParams = (body: IMechanicReportFilters) => {
    const datePart = getDatePart(body.dateFrom, body.dateTo)
    const filialsPart = body.filials.length > 0
        ? `&filials=${arrayToString(body.filials)}`
        : ''
    const mechanicsPart = body.mechanics.length > 0
        ? `&mechanics=${arrayToString(body.mechanics)}`
        : ''
    const diagnosticCountPart = body.diagnosticsCount !== undefined
        ? `&diagnostic-count=${body.diagnosticsCount}&diagnostic-count-sign=${body.diagnosticsCountSign}`
        : ''
    const worksCountPart = body.worksCount !== undefined
        ? `&works-count=${body.worksCount}&works-count-sign=${body.worksCount}`
        : ''
    const worksAveragePart = body.worksAverage !== undefined
        ? `&works-average=${body.worksAverage}&works-average-sign=${body.worksAverageSign}`
        : ''
    const reportsCountPart = body.reportsCount !== undefined
        ? `&reports-count=${body.reportsCount}&reports-count-sign=${body.reporstCountSign}`
        : ''
    return datePart + filialsPart + mechanicsPart + diagnosticCountPart + worksCountPart + worksAveragePart + reportsCountPart
}

const getMechanicFilialParams = (body: IMechanicFilialReportFilters) => {
    const datePart = getDatePart(body.dateFrom, body.dateTo)
    const filialsPart = body.filials.length > 0
        ? `&filials=${arrayToString(body.filials)}`
        : ''
    const diagnosticCountPart = body.diagnosticsCount !== undefined
        ? `&diagnostic-count=${body.diagnosticsCount}&diagnostic-count-sign=${body.diagnosticsCountSign}`
        : ''
    const worksCountPart = body.worksCount !== undefined
        ? `&works-count=${body.worksCount}&works-count-sign=${body.worksCount}`
        : ''
    const worksAveragePart = body.worksAverage !== undefined
        ? `&works-average=${body.worksAverage}&works-average-sign=${body.worksAverageSign}`
        : ''
    const reportsCountPart = body.reportsCount !== undefined
        ? `&reports-count=${body.reportsCount}&reports-count-sign=${body.reporstCountSign}`
        : ''
    return datePart + filialsPart + diagnosticCountPart + worksCountPart + worksAveragePart + reportsCountPart
}

const getReceptionistParams = (body: IReceptionistReportFilters) => {
    const datePart = getDatePart(body.dateFrom, body.dateTo)
    const filialsPart = body.filials.length > 0
        ? `&filials=${arrayToString(body.filials)}`
        : ''
    const receptionistsPart = body.receptionists.length > 0
        ? `&receptionists=${arrayToString(body.receptionists)}`
        : ''
    const carsCountPart = body.carsCount !== undefined
        ? `&cars-count=${body.carsCount}&cars-count-sign=${body.carsCountSign}`
        : ''
    const carsProcessedPart = body.carsProcessed !== undefined
        ? `&cars-processed=${body.carsProcessed}&cars-processed-sign=${body.carsProcessedSign}`
        : ''
    const processedPercentPart = body.processedPercent !== undefined
        ? `&processed-percent=${body.processedPercent}&processed-percent-sign=${body.processedPercentSign}`
        : ''
    const carsGivenAwayPart = body.carsGivenAway !== undefined
        ? `&cars-given-away=${body.carsGivenAway}&cars-given-away-sign=${body.carsGivenAwaySign}`
        : ''
    const reportsGivenAwayPart = body.reportsGivenAway !== undefined
        ? `&reports-given-away=${body.reportsGivenAway}&reports-given-away-sign=${body.reportsGivenAwaySign}`
        : ''
    const reportsPercentPart = body.reportsPercent !== undefined
        ? `&reports-percent=${body.reportsPercent}&reports-percent-sign=${body.reportsPercentSign}`
        : ''
    return datePart + filialsPart + receptionistsPart + carsCountPart + carsProcessedPart + processedPercentPart + carsGivenAwayPart + reportsGivenAwayPart + reportsPercentPart
}

const getReceptionistFilialParams = (body: IReceptionistFilialReportFilters) => {
    const datePart = getDatePart(body.dateFrom, body.dateTo)
    const filialsPart = body.filials.length > 0
        ? `&filials=${arrayToString(body.filials)}`
        : ''
    const carsCountPart = body.carsCount !== undefined
        ? `&cars-count=${body.carsCount}&cars-count-sign=${body.carsCountSign}`
        : ''
    const carsProcessedPart = body.carsProcessed !== undefined
        ? `&cars-processed=${body.carsProcessed}&cars-processed-sign=${body.carsProcessedSign}`
        : ''
    const processedPercentPart = body.processedPercent !== undefined
        ? `&processed-percent=${body.processedPercent}&processed-percent-sign=${body.processedPercentSign}`
        : ''
    const carsGivenAwayPart = body.carsGivenAway !== undefined
        ? `&cars-given-away=${body.carsGivenAway}&cars-given-away-sign=${body.carsGivenAwaySign}`
        : ''
    const reportsGivenAwayPart = body.reportsGivenAway !== undefined
        ? `&reports-given-away=${body.reportsGivenAway}&reports-given-away-sign=${body.reportsGivenAwaySign}`
        : ''
    const reportsPercentPart = body.reportsPercent !== undefined
        ? `&reports-percent=${body.reportsPercent}&reports-percent-sign=${body.reportsPercentSign}`
        : ''
    return datePart + filialsPart + carsCountPart + carsProcessedPart + processedPercentPart + carsGivenAwayPart + reportsGivenAwayPart + reportsPercentPart
}

export const analyticsApi = createApi({
    reducerPath: "analyticsApi",
    baseQuery: baseQueryWithRefresh({ url: AnalyticsEndpointRoutes.Base }),
    endpoints: (builder) => ({
        getMechanicAnalytics: builder.query<{data: IMechanicReport[]}, IMechanicReportFilters>({
            query: (body) => ({
                url: `${AnalyticsEndpointRoutes.Mechanic}${getMechanicParams(body)}`
            })
        }),
        getMechanicFilialAnalytics: builder.query<{data: IMechanicFilialReport[]}, IMechanicFilialReportFilters>({
            query: (body) => ({
                url: `${AnalyticsEndpointRoutes.MechanicFilial}${getMechanicFilialParams(body)}`
            })
        }),
        getReceptionistAnalytics: builder.query<{data: IReceptionistReport[]}, IReceptionistReportFilters>({
            query: (body) => ({
                url: `${AnalyticsEndpointRoutes.Receptionist}${getReceptionistParams(body)}`
            })
        }),
        getReceptionistFilialAnalytics: builder.query<{data: IReceptionistFilialReport[]}, IReceptionistFilialReportFilters>({
            query: (body) => ({
                url: `${AnalyticsEndpointRoutes.ReceptionistFilial}${getReceptionistFilialParams(body)}`
            })
        }),
    }),
});

export const { 
    useGetMechanicAnalyticsQuery,
    useGetMechanicFilialAnalyticsQuery,
    useGetReceptionistAnalyticsQuery,
    useGetReceptionistFilialAnalyticsQuery,
} = analyticsApi