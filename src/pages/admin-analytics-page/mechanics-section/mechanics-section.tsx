import { useState } from 'react'
import styles from './style.module.scss'
import { STARTING_DATE } from '../../../services/utils/constants/date'
import { useGetMechanicAnalyticsQuery } from '../../../services/api/analytics'
import { ESign } from '../../../services/types/analytics'
import { useGetFilialsQuery } from '../../../services/api/filial'
import { useGetPersonalQuery } from '../../../services/api/personal'
import Section from '../../../components/ui/section/section'
import Typography from '../../../components/ui/typography/typography'
import TableHeader from './components/table-header/table-header'
import { ERoles } from '../../../services/types/user'
import Table from './components/table/table'
import CreateReportButton from './components/create-report-button/create-report-button'
import { useGetMeQuery } from '../../../services/api/user'

const MechanicsSection = () => {
    const [dateFrom, setDateFrom] = useState(STARTING_DATE)
    const [dateTo, setDateTo] = useState(new Date(Date.now()))
    const [chosenFilials, setChosenFilials] = useState<{id: string, title: string}[]>([])
    const [chosenMechanics, setChosenMechanics] = useState<{id: string, title: string}[]>([])
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
    const { data: personal, isLoading: isPersonalLoading } = useGetPersonalQuery()
    const {data: analytics, isLoading: isAnalyticsLoading} = useGetMechanicAnalyticsQuery({
        dateFrom, 
        dateTo,
        filials: chosenFilials.map(el => el.id),
        mechanics: chosenMechanics.map(el => el.id),
        worksAverageSign: state.worksAverageSign,
        worksCountSign: state.worksCountSign,
        worksAverage: state.worksAverage,
        worksCount: state.worksCount,
        reporstCountSign: state.reporstCountSign,
        reportsCount: state.reportsCount,
        diagnosticsCountSign: state.diagnosticsCountSign,
        diagnosticsCount: state.diagnosticsCount
    })

    const { data: me } = useGetMeQuery()

    if (!analytics) return null

    const filteredPersonal = personal?.data.filter(el => el.role === ERoles.Mechanic).map(el => ({
        id: el.id,
        title: el.lastName + ' ' + el.firstName[0] + '.' + el.middleName[0] + '.'
    }))

    const now = new Date(Date.now())
    const documentLabel = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()} - сводный отчет по проделанным работам (по ст.)`

    return (
        <div className={styles.section}>
            <Typography variant='h2' color='black'>Сводный отчет по проделанным работам (по ст.)</Typography>
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
                        mechanics={filteredPersonal}
                        chosenMechanics={chosenMechanics}
                        isMechanicsLoading={isPersonalLoading}
                        setChosenMechanics={setChosenMechanics}
                        state={state}
                        setState={setState}
                    />
                    <Table 
                        data={analytics?.data}
                        isLoading={isAnalyticsLoading}
                    />
                    {analytics &&
                        <CreateReportButton data={analytics.data} label={documentLabel} isAdmin={me?.role === ERoles.FullAdmin}/>
                    }
                </div>
            </Section>
        </div>
    )
}

export default MechanicsSection