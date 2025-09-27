import { FC, useState } from 'react';
import SearchInput from '../../../../../../components/ui/search-input/search-input';
import DateFilter from '../../../../../../components/date-filter/date-filter';
import FilterButton from '../../../../../../components/filter-button/filter-button';
import FilterModal from './components/filter-modal/filter-modal';

import styles from './style.module.scss'

interface ITableHeader {
    search: string
    onChangeSearch: React.ChangeEventHandler<HTMLInputElement>
    dateTo: Date
    dateFrom: Date
    onChangeDateTo: (d: Date) => void
    onChangeDateFrom: (d: Date) => void
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
    mechanics: {
        id: number
        title: string
    }[] | undefined
    isMechanicsLoading: boolean
    chosenMechanics: {
        id: number,
        title: string
    }[]
    setChosenMechanics: React.Dispatch<React.SetStateAction<{
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
                        onClose={() => {
                            setTimeout(() => setOpenFilters(false), 0)
                        }}
                        filials={props.filials}
                        isFilialsLoading={props.isFilialsLoading}
                        chosenFilials={props.chosenFilials}
                        setChosenFilials={props.setChosenFilials}
                        mechanics={props.mechanics}
                        chosenMechanics={props.chosenMechanics}
                        setChosenMechanics={props.setChosenMechanics}
                        isMechanicsLoading={props.isMechanicsLoading}
                    />
                </FilterButton>
            </div>
        </div>
    )
}

export default TableHeader