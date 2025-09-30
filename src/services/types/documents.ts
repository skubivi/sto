import { IId } from "./base"

export enum EDiagnostic {
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
    type: EDiagnostic,
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
    file: Blob
    data: T
}

export interface IPostDocumentDiagnostic<T> {
    label: string
    type: EDiagnostic
    file: Blob
    carProcessingId: string
    filialId: string
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

export interface IFreeReportData {
    carNumber: string
    mileage: number
    mechanicName: string
    data: {
        text: string
        photo: Blob | undefined
    }[]
}

export interface IElectroDiagnosticData {
    carNumber: string
    mileage: number
    mechanicName: string
    data: {
        title: string
        subtitle: string
        text: string
        photo: Blob | undefined
    }[]
}