import { FC } from 'react';
import StyledSelect from '../../../../../../components/ui/styled-select/styled-select'
import { ERolesWithAll } from '../../../../../../services/types/user'
import SearchInput from '../../../../../../components/ui/search-input/search-input';

import styles from './style.module.scss'

interface ITableHeader {
    activeFilter: ERolesWithAll,
    filterOptions: {
        id: ERolesWithAll;
        title: string;
    }[],
    onFilterChange: (id: ERolesWithAll) => void
    search: string
    onChangeSearch: React.ChangeEventHandler<HTMLInputElement>
}

const TableHeader: FC<ITableHeader> = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles['search-container']}>
                <SearchInput onChange={props.onChangeSearch} value={props.search}/>
            </div>
            <div className={styles['select-container']}>
                <StyledSelect active={props.activeFilter} onChange={props.onFilterChange} options={props.filterOptions}/>
            </div>
        </div>
    )
}

export default TableHeader