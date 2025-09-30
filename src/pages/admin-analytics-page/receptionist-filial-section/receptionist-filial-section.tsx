import { useState } from 'react'
import { STARTING_DATE } from '../../../services/utils/constants/date'

import styles from './style.module.scss'
import { ESign } from '../../../services/types/analytics'
import { useGetFilialsQuery } from '../../../services/api/filial'
import { useGetReceptionistFilialAnalyticsQuery } from '../../../services/api/analytics'
import Typography from '../../../components/ui/typography/typography'
import Section from '../../../components/ui/section/section'
import TableHeader from './components/table-header/table-header'
import Table from './components/table/table'
import CreateReportButton from './components/create-report-button/create-report-button'

const ReceptionistFilialSection = () => {
    const [dateFrom, setDateFrom] = useState(STARTING_DATE)
    const [dateTo, setDateTo] = useState(new Date(Date.now()))
    const [chosenFilials, setChosenFilials] = useState<{id: string, title: string}[]>([])
    const [state, setState] = useState<{
        carsCount: number | undefined,
        carsCountSign: ESign,
        carsProcessed: number | undefined,
        carsProcessedSign: ESign,
        processedPercent: number | undefined,
        processedPercentSign: ESign,
        carsGivenAway: number | undefined,
        carsGivenAwaySign: ESign,
        reportsGivenAway: number | undefined,
        reportsGivenAwaySign: ESign,
        reportsPercent: number | undefined,
        reportsPercentSign: ESign,
    }>({
        carsCount: undefined,
        carsCountSign: ESign.More,
        carsProcessed: undefined,
        carsProcessedSign: ESign.More,
        processedPercent: undefined,
        processedPercentSign: ESign.More,
        carsGivenAway: undefined,
        carsGivenAwaySign: ESign.More,
        reportsGivenAway: undefined,
        reportsGivenAwaySign: ESign.More,
        reportsPercent: undefined,
        reportsPercentSign: ESign.More,
    })

    const { data: filials, isLoading: isFilialsLoading } = useGetFilialsQuery()
    const {data: analytics, isLoading: isAnalyticsLoading} = useGetReceptionistFilialAnalyticsQuery({
        dateFrom: dateFrom.toJSON(), 
        dateTo: dateTo.toJSON(),
        filials: chosenFilials.map(el => el.id),
        carsCount: state.carsCount,
        carsCountSign: state.carsCountSign,
        carsProcessed: state.carsProcessed,
        carsProcessedSign: state.carsProcessedSign,
        processedPercent: state.processedPercent,
        processedPercentSign: state.processedPercentSign,
        carsGivenAway: state.carsGivenAway,
        carsGivenAwaySign: state.carsGivenAwaySign,
        reportsGivenAway: state.reportsGivenAway,
        reportsGivenAwaySign: state.reportsGivenAwaySign,
        reportsPercent: state.reportsPercent,
        reportsPercentSign: state.reportsPercentSign,
    })
    
    const now = new Date(Date.now())
    const documentLabel = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} - сводный отчет по проделанным работам (по ст.)`
    
    if (!analytics) return null

    return (
        <div className={styles.section}>
            <Typography variant='h2' color='black'>Сводный отчет по принятым машинам (в общем)</Typography>
            <Section>
                <div className={styles.table}>
                    <TableHeader 
                        dateTo={dateTo}
                        dateFrom={dateFrom}
                        onChangeDateFrom={setDateFrom}
                        onChangeDateTo={setDateTo}
                        filials={filials?.data}
                        isFilialsLoading={isFilialsLoading}
                        chosenFilials={chosenFilials}
                        setChosenFilials={setChosenFilials}
                        state={state}
                        setState={setState}
                    />
                    <Table 
                        data={analytics?.data}
                        isLoading={isAnalyticsLoading}
                    />
                    {analytics &&
                        <CreateReportButton data={analytics.data} label={documentLabel} />
                    }
                </div>
            </Section>
        </div>
    )
}

export default ReceptionistFilialSection