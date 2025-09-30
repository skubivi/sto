import { useState } from 'react'
import styles from './style.module.scss'
import { STARTING_DATE } from '../../../services/utils/constants/date'
import { useGetMechanicFilialAnalyticsQuery } from '../../../services/api/analytics'
import { ESign } from '../../../services/types/analytics'
import { useGetFilialsQuery } from '../../../services/api/filial'
import Section from '../../../components/ui/section/section'
import Typography from '../../../components/ui/typography/typography'
import TableHeader from './components/table-header/table-header'
import CreateReportButton from './components/create-report-button/create-report-button'
import Table from './components/table/table'

const MechanicFilialSection = () => {
    const [dateFrom, setDateFrom] = useState(STARTING_DATE)
    const [dateTo, setDateTo] = useState(new Date(Date.now()))
    const [chosenFilials, setChosenFilials] = useState<{id: string, title: string}[]>([])
    const [state, setState] = useState<{
        diagnosticsCount: undefined | number,
        diagnosticsCountSign: ESign,
        worksCount: undefined | number,
        worksCountSign: ESign,
        worksAverage: undefined | number,
        worksAverageSign: ESign,
        reportsCount: undefined | number,
        reporstCountSign: ESign,
    }>({
        diagnosticsCount: undefined,
        diagnosticsCountSign: ESign.More,
        worksCount: undefined,
        worksCountSign: ESign.More,
        worksAverage: undefined,
        worksAverageSign: ESign.More,
        reportsCount: undefined,
        reporstCountSign: ESign.More,
    })
    
    const { data: filials, isLoading: isFilialsLoading } = useGetFilialsQuery()
    const {data: analytics, isLoading: isAnalyticsLoading} = useGetMechanicFilialAnalyticsQuery({
        dateFrom: dateFrom.toString(), 
        dateTo: dateTo.toString(),
        filials: chosenFilials.map(el => el.id),
        worksAverageSign: state.worksAverageSign,
        worksCountSign: state.worksCountSign,
        worksAverage: state.worksAverage,
        worksCount: state.worksCount,
        reporstCountSign: state.reporstCountSign,
        reportsCount: state.reportsCount,
        diagnosticsCountSign: state.diagnosticsCountSign,
        diagnosticsCount: state.diagnosticsCount
    })

    const now = new Date(Date.now())
    const documentLabel = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} - сводный отчет по проделанным работам (в общем)`

    if (!analytics) return null

    return (
        <div className={styles.section}>
            <Typography variant='h2' color='black'>Сводный отчет по проделанным работам (в общем)</Typography>
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
                        <CreateReportButton data={analytics.data} label={documentLabel}/>
                    }
                </div>
            </Section>
        </div>
    )
}

export default MechanicFilialSection