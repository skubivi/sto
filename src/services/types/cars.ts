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
    mileage: number
}

export interface ICarFilters {
    dateFrom: Date
    dateTo: Date
    receptionists: string[]
    status: ECarStatusWithAll
}

export interface ICarForMechanic {
    id: string
    carNumber: string
    mileage: number
    status: ECarStatus
}