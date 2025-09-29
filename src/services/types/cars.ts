export enum ECarStatus {
    Created = 'CREATED',
    Processed = 'PROCESSED',
    Finished = 'FINISHED'
}

export enum ECarStatusWithAll {
    All = 'ALL',
    Created = 'CREATED',
    Processed = 'PROCESSED',
    Finished = 'FINISHED'
}

export interface ICar {
    id: string
    receptionistId: string
    clientDataId: string
    carNumber: string
    status: ECarStatus
    createdAt: Date
}

export interface ICarToPost {
    client: {
        phone: string
        firstName?: string
        lastName?: string
        middleName?: string
    }
    carNumber: string
    mileage: string
}

export interface ICarFilters {
    dateFrom: string
    dateTo: string
    receptionists: string[]
    status: ECarStatusWithAll
}