import { useState } from 'react'
import Pagination from '../../../../components/ui/pagination/paginations'
import Section from '../../../../components/ui/section/section'
import Typography from '../../../../components/ui/typography/typography'
import { STARTING_DATE } from '../../../../services/utils/constants/date'
import TableHeader from './components/table-header/table-header'
import { useGetPersonalQuery } from '../../../../services/api/personal'
import { ERoles } from '../../../../services/types/user'

import styles from './style.module.scss'
import { useGetCarsQuery } from '../../../../services/api/cars'
import { ECarStatusWithAll, ICar } from '../../../../services/types/cars'
import Table from './components/table/table'
import InfoModal from './components/info-modal/info-modal'
import ApproveModal from './components/approve-modal/approve-modal'
import NewCar from './components/new-car/new-car'

const CarsSection = () => {
    const [itemsOnPage, setItemsOnPage] = useState<5 | 10 | 20 | 50>(5)
    const [page, setPage] = useState(0)
    const [dateFrom, setDateFrom] = useState(STARTING_DATE)
    const [dateTo, setDateTo] = useState(new Date(Date.now()))
    const [openInfo, setOpenInfo] = useState<string | undefined>(undefined)
    const [openApprove, setOpenApprove] = useState<string | undefined>(undefined)
    const [chosenReceptionists, setChosenReceptionists] = useState<{id: string, title: string}[]>([])
    const [status, setStatus] = useState(ECarStatusWithAll.All)

    const { data: personal, isLoading: isPersonalLoading } = useGetPersonalQuery()
    const {data: cars, isLoading: isCarsLoading} = useGetCarsQuery({
        dateFrom,
        dateTo,
        receptionists: chosenReceptionists.map(el => el.id),
        status
    })

    const filteredPersonal = personal?.data.filter(el => el.role === ERoles.Receptionist).map(el => ({
        id: el.id,
        title: el.lastName + ' ' + el.firstName[0] + '.' + el.middleName[0] + '.'
    }))

    const getCarInfo = (id: string) => cars?.data.find(el => el.id === id) as ICar

    return (
        <div className={styles.section}>
            {openInfo !== undefined &&
                <InfoModal open={openInfo !== undefined} onClose={() => setOpenInfo(undefined)} data={getCarInfo(openInfo)}/>
            }
            {openApprove !== undefined &&
                <ApproveModal open={openApprove !== undefined} onClose={() => setOpenApprove(undefined)} data={getCarInfo(openApprove)}/>
            }
            <Typography variant='h2' color='black'>Машины в приёмке</Typography>
            <Section>
                <div className={styles.table}>
                    <TableHeader 
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        onChangeDateFrom={setDateFrom}
                        onChangeDateTo={setDateTo}
                        receptionists={filteredPersonal}
                        chosenReceptionists={chosenReceptionists}
                        isReceptionistsLoading={isPersonalLoading}
                        setChosenReceptionists={setChosenReceptionists}
                        status={status}
                        onChangeStatus={setStatus}
                    />
                    <Table 
                        data={cars?.data}
                        isLoading={isCarsLoading}
                        page={page}
                        itemsOnPage={itemsOnPage}
                        onApproveClick={setOpenApprove}
                        onInfoClick={setOpenInfo}
                    />
                    <Pagination 
                        itemsOnPage={itemsOnPage}
                        items={cars?.data.length ?? 0}
                        page={page}
                        onChangePage={setPage}
                        onChangeItemsOnPage={setItemsOnPage}
                    />
                    <NewCar />
                </div>
            </Section>
        </div>
    )
}

export default CarsSection