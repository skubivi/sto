export enum ESign {
    More = 'more',
    Less = 'less'
}

export interface IMechanicReport {
    filialId: number
    mechanicId: number
    diagnosticsCount: number
    worksCount: number
    worksAverage: number
    reportsCount: number
}

export interface IMechanicReportFilters {
    dateFrom: string
    dateTo: string
    filials: number[]
    mechanics: number[]
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
    filialId: number
    diagnosticsCount: number
    worksCount: number
    worksAverage: number
    reportsCount: number
}

export interface IMechanicFilialReportFilters {
    dateFrom: string
    dateTo: string
    filials: number[]
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
    filialId: number
    receptionistId: number
    carsCount: number
    carsProcessed: number
    processedPercent: number
    carsGivenAway: number
    reportsGivenAway: number
    reportsPercent: number
}

export interface IReceptionistReportFilters {
    dateFrom: string
    dateTo: string
    filials: number[]
    receptionists: number[]
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
    filialId: number
    carsCount: number
    carsProcessed: number
    processedPercent: number
    carsGivenAway: number
    reportsGivenAway: number
    reportsPercent: number
}

export interface IReceptionistFilialReportFilters {
    dateFrom: string
    dateTo: string
    filials: number[]
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