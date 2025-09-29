import { IId } from "./base"

export enum EDianostic {
    Electric = 'ELECTRIC',
    Metalworker = 'METALWORKER',
    Free = 'FREE'
}

export interface IDocumentToApprove {
    id: string
    label: string
    filialId?: string
    mechanicId: string
    clientDataId: string
    carNumber: string
    type: EDianostic,
    createdAt: Date
}

export interface IDocumentComment {
    reviewerId: string
    comment: string
    createdAt: Date
}

export interface IDocumentCommentToPost {
    documentId: string
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
    filials?: string[]
}

export interface IDocumentReport {
    id: string
    label: string
    filialId?: string[]
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
    filials: string[]
    mechanics: string[]
}

export interface IDiagnosticDocument {
    id: string
    label: string
    filialId?: string
    mechanicId: string
    clientDataId: string
    carNumber: string
    createdAt: Date
}