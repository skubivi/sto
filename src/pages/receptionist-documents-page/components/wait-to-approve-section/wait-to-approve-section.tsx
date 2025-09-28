import { useState } from 'react'
import Pagination from '../../../../components/ui/pagination/paginations'
import Section from '../../../../components/ui/section/section'
import Typography from '../../../../components/ui/typography/typography'
import styles from './style.module.scss'
import TableHeader from './components/table-header/table-header'
import { STARTING_DATE } from '../../../../services/utils/constants/date'
import { useGetDocumentsToApproveQuery } from '../../../../services/api/documents'
import DocumentComments from '../../../../components/document-comments/document-comments'
import DeclineModal from './components/decline-modal/decline-modal'
import StyledModal from '../../../../components/ui/styled-modal/styled-modal'
import ApproveModal from './components/approve-modal/approve-modal'
import Table from './components/table/table'

const WaitToApproveSection = () => {
    const [itemsOnPage, setItemsOnPage] = useState<5 | 10 | 20 | 50>(5)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [dateFrom, setDateFrom] = useState(STARTING_DATE)
    const [dateTo, setDateTo] = useState(new Date(Date.now()))
    const [openComments, setOpenComments] = useState<number | undefined>(undefined)
    const [openDeclineModal, setOpenDeclineModal] = useState<number | undefined>(undefined)
    const [openApproveModal, setOpenApproveModal] = useState<number | undefined>(undefined)

    const {data: documents, isLoading: isDocumentsLoading} = useGetDocumentsToApproveQuery({dateFrom: dateFrom.toString(), dateTo: dateTo.toString()})

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
            {openApproveModal !== undefined &&
                <StyledModal open={openApproveModal !== undefined} onClose={() => setOpenApproveModal(undefined)}>
                    <ApproveModal onClose={() => setOpenApproveModal(undefined)} documentId={openApproveModal} />
                </StyledModal>
            }
            {openDeclineModal !== undefined &&
                <StyledModal open={openDeclineModal !== undefined} onClose={() => setOpenDeclineModal(undefined)}>
                    <DeclineModal onClose={() => setOpenDeclineModal(undefined)} documentId={openDeclineModal} />
                </StyledModal>
            }
            {openComments !== undefined &&
                <DocumentComments open={openComments !== undefined} onClose={() => setOpenComments(undefined)} documentId={openComments}/>
            }
            <Typography variant='h2' color='black'>Документы ожидающие утверждения</Typography>
            <Section>
                <div className={styles.table}>
                    <TableHeader 
                        search={search}
                        onChangeSearch={(e) => setSearch(e.target.value)}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        onChangeDateFrom={setDateFrom}
                        onChangeDateTo={setDateTo}
                    />
                    <Table 
                        data={filteredDocuments}
                        isLoading={isDocumentsLoading}
                        onCommentsClick={setOpenComments}
                        onDeclineClick={setOpenDeclineModal}
                        onApproveClick={setOpenApproveModal}
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

export default WaitToApproveSection