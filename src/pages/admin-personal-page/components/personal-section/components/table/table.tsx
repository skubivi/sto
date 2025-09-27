import { FC } from 'react'
import Stripe from '../../../../../../components/ui/stripe/stripe'
import TableHeader from './components/table-header/table-header'

import styles from './style.module.scss'
import PersonalRow from './components/personal-row/personal-row'
import Loader from '../../../../../../components/ui/loader/loader'
import ColStripe from '../../../../../../components/ui/col-stripe/col-stripe'
import { paginationFilter } from '../../../../../../services/utils/helper-functions/pagination'

interface ITable {
    data: {
        id: number
        createdAt: Date
        firstName: string
        lastName: string
        middleName: string
    }[] | undefined
    isLoading: boolean
    openDeleteModal: (id: number) => void
    openChangePasswordModal: (id: number) => void
    page: number
    itemsOnPage: number
}

const Table: FC<ITable> = (props) => {
    return (
        <div className={styles.table}>
            <TableHeader />
            <Stripe />
            <div className={styles.stripes}>
                <ColStripe />
                <ColStripe />
            </div>
            {props.isLoading && 
                <div className={styles['loading-body']}>
                    <div className={styles['loading-wrapper']}>
                        <Loader />
                    </div>
                </div>
            }
            {props.data !== undefined && paginationFilter(props.data, props.page, props.itemsOnPage).map(el => (
                <PersonalRow 
                    key={el.id} 
                    {...el} 
                    openChangePasswordModal={() => props.openChangePasswordModal(el.id)}
                    openDeleteModal={() => props.openDeleteModal(el.id)}
                />
            ))}
        </div>
    )
}

export default Table