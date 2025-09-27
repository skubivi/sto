import { FC } from 'react';
import SearchInput from '../../../../../../components/ui/search-input/search-input';
import DateFilter from '../../../../../../components/date-filter/date-filter';

import styles from './style.module.scss'

interface ITableHeader {
    search: string
    onChangeSearch: React.ChangeEventHandler<HTMLInputElement>
    dateTo: Date
    dateFrom: Date
    onChangeDateTo: (d: Date) => void
    onChangeDateFrom: (d: Date) => void
}

const TableHeader: FC<ITableHeader> = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles['search-container']}>
                <SearchInput onChange={props.onChangeSearch} value={props.search}/>
            </div>
            <div className={styles['date-container']}>
                <DateFilter from={props.dateFrom} to={props.dateTo} onChoseFrom={props.onChangeDateFrom} onChoseTo={props.onChangeDateTo} />
            </div>
        </div>
    )
}

export default TableHeader