import { useState } from 'react'
import Pagination from '../../../../components/ui/pagination/paginations'
import Section from '../../../../components/ui/section/section'
import Typography from '../../../../components/ui/typography/typography'
import { STARTING_DATE } from '../../../../services/utils/constants/date'
import { useGetDianosticDocumentsQuery } from '../../../../services/api/documents'
import DocumentComments from '../../../../components/document-comments/document-comments'
import TableHeader from './components/table-header/table-header'
import { useGetFilialsQuery } from '../../../../services/api/filial'
import { useGetPersonalQuery } from '../../../../services/api/personal'
import { ERoles } from '../../../../services/types/user'

import styles from './style.module.scss'
import Table from './components/table/table'

const DiagnosticSection = () => {
    const [itemsOnPage, setItemsOnPage] = useState<5 | 10 | 20 | 50>(5)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [dateFrom, setDateFrom] = useState(STARTING_DATE)
    const [dateTo, setDateTo] = useState(new Date(Date.now()))
    const [openComments, setOpenComments] = useState<string | undefined>(undefined)
    const [chosenFilials, setChosenFilials] = useState<{id: string, title: string}[]>([])
    const [chosenMechanics, setChosenMechanics] = useState<{id: string, title: string}[]>([])

    const { data: filials, isLoading: isFilialsLoading } = useGetFilialsQuery()
    const { data: personal, isLoading: isPersonalLoading } = useGetPersonalQuery()
    const {data: documents, isLoading: isDocumentsLoading} = useGetDianosticDocumentsQuery({
        dateFrom, 
        dateTo,
        filials: chosenFilials.map(el => el.id),
        mechanics: chosenMechanics.map(el => el.id)
    })

    const filteredPersonal = personal?.data.filter(el => el.role === ERoles.Mechanic).map(el => ({
        id: el.id,
        title: el.lastName + ' ' + el.firstName[0] + '.' + el.middleName[0] + '.'
    }))

    let filteredDocuments = documents?.data
    if (search.length > 0) filteredDocuments = filteredDocuments?.filter(el => {
        if (search.split(' ').length === 1) {
            if (el.label.toLowerCase().includes(search.toLowerCase())) return true
            if (el.carNumber.toLowerCase().includes(search.toLowerCase())) return true
        }
        return false
    })

    return (
        <div className={styles.section}>
            {openComments !== undefined &&
                <DocumentComments open={openComments !== undefined} onClose={() => setOpenComments(undefined)} documentId={openComments}/>
            }
            <Typography variant='h2' color='black'>Документы диагностики (утвержденные)</Typography>
            <Section>
                <div className={styles.table}>
                    <TableHeader 
                        search={search}
                        onChangeSearch={(e) => setSearch(e.target.value)}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        onChangeDateFrom={setDateFrom}
                        onChangeDateTo={setDateTo}
                        chosenFilials={chosenFilials}
                        filials={filials?.data}
                        isFilialsLoading={isFilialsLoading}
                        setChosenFilials={setChosenFilials}
                        mechanics={filteredPersonal}
                        chosenMechanics={chosenMechanics}
                        isMechanicsLoading={isPersonalLoading}
                        setChosenMechanics={setChosenMechanics}
                    />
                    <Table 
                        data={filteredDocuments}
                        isLoading={isDocumentsLoading}
                        onCommentsClick={setOpenComments}
                        page={page}
                        itemsOnPage={itemsOnPage}
                    />
                    <Pagination 
                        itemsOnPage={itemsOnPage}
                        items={filteredDocuments?.length ?? 0}
                        page={page}
                        onChangePage={setPage}
                        onChangeItemsOnPage={setItemsOnPage}
                    />
                </div>
            </Section>
        </div>
    )
}

export default DiagnosticSection