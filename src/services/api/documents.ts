import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithRefresh from "./base-query-with-refresh";
import { DocumentEndpointRoutes } from "../routes/endpoints/documents";
import { IAnalyticsDocumentsFilters, IDiagnosticDocument, IDiagnosticFilters, IDocumentCommentToPost, IDocumentReport, IDocumentToApprove, IPostDocumentDiagnostic, IPostDocumentReport, TDocumentCommentWithId } from "../types/documents";
import { IFilterDate } from "../types/base";

const getDocumentToApproveParams = (body: IFilterDate) => {
    return `?date-from=${body.dateFrom}&date-to=${body.dateTo}`
}

const arrayToString = (f: string[]) => {
    let result = ''
    f.forEach(element => result += `${element}_`)
    result = result.slice(0, -1)
    return result
}

const getAnalyticsDocumentsParams = (body: IFilterDate & IAnalyticsDocumentsFilters) => {
    const datePart = `?date-from=${body.dateFrom}&date-to=${body.dateTo}`
    const typePart = `&type=${body.type}`
    const filialsPart = body.filials && body.filials.length > 0
        ? `&filials=${arrayToString(body.filials)}`
        : ''
    return datePart + typePart + filialsPart
}
const getDianosticDocumentsParams = (body: IFilterDate & IDiagnosticFilters) => {
    const datePart = `?date-from=${body.dateFrom}&date-to=${body.dateTo}`
    const filialPart = body.filials.length > 0
        ? `&filials=${arrayToString(body.filials)}`
        : ''
    const mechanicPart = body.mechanics.length > 0
        ? `&mechanics=${arrayToString(body.mechanics)}`
        : ''
    return datePart + filialPart + mechanicPart
}

export const documentsApi = createApi({
    reducerPath: "documentsApi",
    baseQuery: baseQueryWithRefresh({ url: DocumentEndpointRoutes.Base }),
    tagTypes: ["DocumentsToApprove", "ReportDocuments", "DiagnosticDocuments"],
    endpoints: (builder) => ({
        getDocument: builder.query<{docLink: string}, {id: string}>({
            query: (body) => ({
                url: `/${body.id}`,
            }),
        }),
        uploadDocumentReport: builder.mutation<{documentId: string}, IPostDocumentReport<object>>({
            query: (body) => {
                const formData = new FormData();
                formData.append("file", body.file, `${body.label}.pdf`);
                formData.append("label", body.label);
                formData.append("type", body.type);
                formData.append("data", JSON.stringify(body.data))

                return {
                    url: DocumentEndpointRoutes.ReportCreate,
                    method: "POST",
                    body: formData,
                };
            },
        }),
        uploadDocumentDiagnostic: builder.mutation<void, IPostDocumentDiagnostic<object>>({
            query: (body) => {
                const formData = new FormData();
                formData.append("file", body.file, `${body.label}.pdf`);
                formData.append("label", body.label);
                formData.append("type", body.type);
                formData.append("data", JSON.stringify(body.data))
                formData.append("carProcessingId", body.carProcessingId)

                return {
                    url: DocumentEndpointRoutes.DiagnosticCreate,
                    method: 'POST',
                    body: formData
                }
            }
        }),
        getDocumentsToApprove: builder.query<{data: IDocumentToApprove[]}, IFilterDate>({
            query: (body) => ({
                url: `${DocumentEndpointRoutes.ToApprove}${getDocumentToApproveParams(body)}`
            }),
            providesTags: ["DocumentsToApprove"]
        }),
        getAnalyticsDocuments: builder.query<{data: IDocumentReport[]}, IFilterDate & IAnalyticsDocumentsFilters>({
            query: (body) => ({
                url: `${DocumentEndpointRoutes.Analytics}${getAnalyticsDocumentsParams(body)}`
            })
        }),
        getDianosticDocuments: builder.query<{data: IDiagnosticDocument[]}, IFilterDate & IDiagnosticFilters>({
            query: (body) => ({
                url: `${DocumentEndpointRoutes.Diagnostic}${getDianosticDocumentsParams(body)}`
            }),
            providesTags: ["DiagnosticDocuments"]
        }),
        getReportDocuments: builder.query<{data: IDiagnosticDocument[]}, IFilterDate & IDiagnosticFilters>({
            query: (body) => ({
                url: `${DocumentEndpointRoutes.Report}${getDianosticDocumentsParams(body)}`
            }),
            providesTags: ["ReportDocuments"]
        }),
        getComments: builder.query<{data: TDocumentCommentWithId[]}, {id: string}>({
            query: (body) => ({
                url: `/${body.id}${DocumentEndpointRoutes.Comments}`
            })
        }),
        postComment: builder.mutation<TDocumentCommentWithId, IDocumentCommentToPost>({
            query: (body) => ({
                url: `/${body.documentId}${DocumentEndpointRoutes.Comments}`,
                method: 'POST',
                body: {
                    comment: body.comment
                }
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(documentsApi.util.updateQueryData(
                        "getComments",
                        {id: args.documentId},
                        (state) => {
                            state.data.push(data)
                        }
                    ))
                // eslint-disable-next-line no-empty
                } catch {}
            }
        }),
        approveDocument: builder.mutation<void, {id: string}>({
            query: (body) => ({
                url: `${DocumentEndpointRoutes.ToApprove}/${body.id}${DocumentEndpointRoutes.Approve}`,
                method: 'PATCH'
            }),
            invalidatesTags: ["DocumentsToApprove", "DiagnosticDocuments", "ReportDocuments"]
        }),
        declineDocument: builder.mutation<void, {id: string}>({
            query: (body) => ({
                url: `${DocumentEndpointRoutes.ToApprove}/${body.id}${DocumentEndpointRoutes.Decline}`,
                method: 'PATCH'
            }),
            invalidatesTags: ["DocumentsToApprove"]
        })
    }),
});

export const { 
    useLazyGetDocumentQuery,
    useGetDocumentsToApproveQuery,
    useGetCommentsQuery,
    usePostCommentMutation,
    useApproveDocumentMutation,
    useDeclineDocumentMutation,
    useGetDocumentQuery,
    useGetAnalyticsDocumentsQuery,
    useGetDianosticDocumentsQuery,
    useGetReportDocumentsQuery,
    useUploadDocumentReportMutation,
    useUploadDocumentDiagnosticMutation
 } = documentsApi;