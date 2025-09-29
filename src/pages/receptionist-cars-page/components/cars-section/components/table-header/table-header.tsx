import { FC, useState } from 'react';
import DateFilter from '../../../../../../components/date-filter/date-filter';
import FilterButton from '../../../../../../components/filter-button/filter-button';
import FilterModal from './components/filter-modal/filter-modal';

import styles from './style.module.scss'
import { ECarStatusWithAll } from '../../../../../../services/types/cars';

interface ITableHeader {
    dateTo: Date
    dateFrom: Date
    onChangeDateTo: (d: Date) => void
    onChangeDateFrom: (d: Date) => void
    receptionists: {
        id: string
        title: string
    }[] | undefined
    isReceptionistsLoading: boolean
    chosenReceptionists: {
        id: string,
        title: string
    }[]
    setChosenReceptionists: React.Dispatch<React.SetStateAction<{
        id: string;
        title: string;
    }[]>>
    status: ECarStatusWithAll
    onChangeStatus: React.Dispatch<React.SetStateAction<ECarStatusWithAll>>
}

const TableHeader: FC<ITableHeader> = (props) => {
    const [openFilters, setOpenFilters] = useState(false)
    return (
        <div className={styles.header}>
            <div className={styles['date-container']}>
                <DateFilter from={props.dateFrom} to={props.dateTo} onChoseFrom={props.onChangeDateFrom} onChoseTo={props.onChangeDateTo} />
            </div>
            <div className={styles['filters-container']}>
                <FilterButton open={openFilters} setOpen={setOpenFilters}>
                    <FilterModal 
                        dateFrom={props.dateFrom}
                        dateTo={props.dateTo}
                        onChangeDateTo={props.onChangeDateFrom}
                        onChangeDateFrom={props.onChangeDateTo}
                        onClose={() => {
                            setTimeout(() => setOpenFilters(false), 0)
                        }}
                        receptionists={props.receptionists}
                        chosenReceptionists={props.chosenReceptionists}
                        setChosenReceptionists={props.setChosenReceptionists}
                        isReceptionistsLoading={props.isReceptionistsLoading}
                        status={props.status}
                        onChangeStatus={props.onChangeStatus}
                    />
                </FilterButton>
            </div>
        </div>
    )
}

export default TableHeader