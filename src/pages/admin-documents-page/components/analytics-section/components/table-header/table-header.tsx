import { FC, useState } from 'react';
import SearchInput from '../../../../../../components/ui/search-input/search-input';
import DateFilter from '../../../../../../components/date-filter/date-filter';

import styles from './style.module.scss'
import FilterButton from '../../../../../../components/filter-button/filter-button';
import { EReportWithAll } from '../../../../../../services/types/documents';
import FilterModal from './components/filter-modal/filter-modal';

interface ITableHeader {
    search: string
    onChangeSearch: React.ChangeEventHandler<HTMLInputElement>
    dateTo: Date
    dateFrom: Date
    onChangeDateTo: (d: Date) => void
    onChangeDateFrom: (d: Date) => void
    type: EReportWithAll,
    setType: (t: EReportWithAll) => void
    filials: {
        id: number,
        title: string
    }[] | undefined
    isFilialsLoading: boolean
    chosenFilials: {
        id: number,
        title: string
    }[]
    setChosenFilials: React.Dispatch<React.SetStateAction<{
        id: number;
        title: string;
    }[]>>
}

const TableHeader: FC<ITableHeader> = (props) => {
    const [openFilters, setOpenFilters] = useState(false)
    return (
        <div className={styles.header}>
            <div className={styles['search-container']}>
                <SearchInput onChange={props.onChangeSearch} value={props.search}/>
            </div>
            <div className={styles['date-container']}>
                <DateFilter from={props.dateFrom} to={props.dateTo} onChoseFrom={props.onChangeDateFrom} onChoseTo={props.onChangeDateTo} />
            </div>
            <div className={styles['filters-container']}>
                <FilterButton open={openFilters} setOpen={setOpenFilters}>
                    <FilterModal 
                        dateFrom={props.dateFrom}
                        dateTo={props.dateTo}
                        setDateFrom={props.onChangeDateFrom}
                        setDateTo={props.onChangeDateTo}
                        type={props.type}
                        setType={props.setType}
                        onClose={() => {
                            setTimeout(() => setOpenFilters(false), 0)
                        }}
                        filials={props.filials}
                        isFilialsLoading={props.isFilialsLoading}
                        chosenFilials={props.chosenFilials}
                        setChosenFilials={props.setChosenFilials}
                    />
                </FilterButton>
            </div>
        </div>
    )
}

export default TableHeader