import { IId } from "./base"

export enum EDianostic {
    Electric = 'ELECTRIC',
    Metalworker = 'METALWORKER',
    Free = 'FREE'
}

export interface IDocumentToApprove {
    id: number
    label: string
    filialId?: number
    mechanicId: number
    clientDataId: number
    carNumber: string
    type: EDianostic,
    createdAt: Date
}

export interface IDocumentComment {
    reviewerId: number
    comment: string
    createdAt: Date
}

export interface IDocumentCommentToPost {
    documentId: number
    comment: string
}

export type TDocumentCommentWithId = IDocumentComment & IId

export enum EReport {
    Mech = 'MECHANIC',
    Rec = 'RECEPTIONIST',
    MechFil = 'MECHANIC_FILIAL',
    RecFil = 'RECEPTIONIST_FILAIL'
}

export enum EReportWithAll {
    All = 'ALL',
    Mech = 'MECHANIC',
    Rec = 'RECEPTIONIST',
    MechFil = 'MECHANIC_FILIAL',
    RecFil = 'RECEPTIONIST_FILAIL'
}

export interface IAnalyticsDocumentsFilters {
    type: EReportWithAll,
    filials?: number[]
}

export interface IDocumentReport {
    id: number
    label: string
    filialId?: number[]
    type: EReport,
    createdAt: Date
}

export interface IPostDocumentReport<T> {
    label: string
    type: EReport
    document: Blob
    data: T
}

export interface IDiagnosticFilters {
    filials: number[]
    mechanics: number[]
}

export interface IDiagnosticDocument {
    id: number
    label: string
    filialId?: number
    mechanicId: number
    clientDataId: number
    carNumber: string
    createdAt: Date
}