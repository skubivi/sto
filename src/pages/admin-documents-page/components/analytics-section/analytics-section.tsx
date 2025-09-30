import { useState } from "react"
import Typography from "../../../../components/ui/typography/typography"
import { EReportWithAll } from "../../../../services/types/documents"
import { STARTING_DATE } from "../../../../services/utils/constants/date"
import DocumentComments from "../../../../components/document-comments/document-comments"
import Section from "../../../../components/ui/section/section"
import Pagination from "../../../../components/ui/pagination/paginations"
import TableHeader from "./components/table-header/table-header"

import styles from './style.module.scss'
import { useGetFilialsQuery } from "../../../../services/api/filial"
import { useGetAnalyticsDocumentsQuery } from "../../../../services/api/documents"
import Table from "./components/table/table"

const AnalyticsSection = () => {
    const [itemsOnPage, setItemsOnPage] = useState<5 | 10 | 20 | 50>(5)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [dateFrom, setDateFrom] = useState(STARTING_DATE)
    const [dateTo, setDateTo] = useState(new Date(Date.now()))
    const [openComments, setOpenComments] = useState<string | undefined>(undefined)
    const [type, setType] = useState<EReportWithAll>(EReportWithAll.All)
    const [chosenFilials, setChosenFilials] = useState<{id: string, title: string}[]>([])

    const { data: filials, isLoading: isFilialsLoading } = useGetFilialsQuery()
    const {data: documents, isLoading: isDocumentsLoading} = useGetAnalyticsDocumentsQuery({
        dateFrom: dateFrom.toString(), 
        dateTo: dateTo.toString(), 
        type,
        filials: chosenFilials.map(el => el.id)
    })

    let filteredDocuments = documents?.data
    if (search.length > 0) filteredDocuments = filteredDocuments?.filter(el => {
        if (search.split(' ').length === 1) {
            if (el.label.toLowerCase().includes(search.toLowerCase())) return true
        }
        return false
    })
    
    return (
        <div className={styles.section}>
            {openComments !== undefined &&
                <DocumentComments open={openComments !== undefined} onClose={() => setOpenComments(undefined)} documentId={openComments}/>
            }
            <Typography variant='h2' color='black'>Отчеты по статистике</Typography>
            <Section>
                <div className={styles.table}>
                    <TableHeader 
                        search={search}
                        onChangeSearch={(e) => setSearch(e.target.value)}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        onChangeDateFrom={setDateFrom}
                        onChangeDateTo={setDateTo}
                        type={type}
                        setType={setType}
                        chosenFilials={chosenFilials}
                        filials={filials?.data}
                        isFilialsLoading={isFilialsLoading}
                        setChosenFilials={setChosenFilials}
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

export default AnalyticsSection