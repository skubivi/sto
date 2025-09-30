export enum ESign {
    More = 'MORE',
    Less = 'LESS'
}

export interface IMechanicReport {
    filialId: string
    mechanicId: string
    diagnosticsCount: number
    worksCount: number
    worksAverage: number
    reportsCount: number
}

export interface IMechanicReportFilters {
    dateFrom: Date
    dateTo: Date
    filials: string[]
    mechanics: string[]
    diagnosticsCount?: number
    diagnosticsCountSign: ESign
    worksCount?: number
    worksCountSign: ESign
    worksAverage?: number
    worksAverageSign: ESign
    reportsCount?: number
    reporstCountSign: ESign
}

export interface IPostMechanicReport {
    filial: string
    mechanic: string
    diagnosticsCount: number
    worksCount: number
    worksAverage: number
    reportsCount: number
}

export interface IMechanicFilialReport {
    filialId: string
    diagnosticsCount: number
    worksCount: number
    worksAverage: number
    reportsCount: number
}

export interface IMechanicFilialReportFilters {
    dateFrom: Date
    dateTo: Date
    filials: string[]
    diagnosticsCount?: number
    diagnosticsCountSign: ESign
    worksCount?: number
    worksCountSign: ESign
    worksAverage?: number
    worksAverageSign: ESign
    reportsCount?: number
    reporstCountSign: ESign
}

export interface IPostMechanicFilialReport {
    filial: string
    diagnosticsCount: number
    worksCount: number
    worksAverage: number
    reportsCount: number
}

export interface IReceptionistReport {
    filialId: string
    receptionistId: string
    carsCount: number
    carsProcessed: number
    processedPercent: number
    carsGivenAway: number
    reportsGivenAway: number
    reportsPercent: number
}

export interface IReceptionistReportFilters {
    dateFrom: Date
    dateTo: Date
    filials: string[]
    receptionists: string[]
    carsCount?: number
    carsCountSign: ESign
    carsProcessed?: number
    carsProcessedSign: ESign
    processedPercent?: number
    processedPercentSign: ESign
    carsGivenAway?: number
    carsGivenAwaySign: ESign
    reportsGivenAway?: number
    reportsGivenAwaySign: ESign
    reportsPercent?: number
    reportsPercentSign?: ESign
}

export interface IPostReceptionistReport {
    filial: string
    receptionist: string
    carsCount: number
    carsProcessed: number
    processedPercent: number
    carsGivenAway: number
    reportsGivenAway: number
    reportsPercent: number
}

export interface IReceptionistFilialReport {
    filialId: string
    carsCount: number
    carsProcessed: number
    processedPercent: number
    carsGivenAway: number
    reportsGivenAway: number
    reportsPercent: number
}

export interface IReceptionistFilialReportFilters {
    dateFrom: Date
    dateTo: Date
    filials: string[]
    carsCount?: number
    carsCountSign: ESign
    carsProcessed?: number
    carsProcessedSign: ESign
    processedPercent?: number
    processedPercentSign: ESign
    carsGivenAway?: number
    carsGivenAwaySign: ESign
    reportsGivenAway?: number
    reportsGivenAwaySign: ESign
    reportsPercent?: number
    reportsPercentSign?: ESign
}

export interface IPostReceptionistFilialReport {
    filial: string
    carsCount: number
    carsProcessed: number
    processedPercent: number
    carsGivenAway: number
    reportsGivenAway: number
    reportsPercent: number
}