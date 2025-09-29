import { FC } from 'react'
import Stripe from '../../../../../../components/ui/stripe/stripe'

import styles from './style.module.scss'
import Loader from '../../../../../../components/ui/loader/loader'
import ColStripe from '../../../../../../components/ui/col-stripe/col-stripe'
import TableHeader from './components/table-header/table-header'
import { paginationFilter } from '../../../../../../services/utils/helper-functions/pagination'
import { ICar } from '../../../../../../services/types/cars'
import CarRow from './components/car-row/car-row'

interface ITable {
    data: ICar[] | undefined
    isLoading: boolean
    page: number
    itemsOnPage: number
    onApproveClick: (n: string) => void
    onInfoClick: (n: string) => void
}

const Table: FC<ITable> = (props) => {

    return (
        <div className={styles.table}>
            <TableHeader />
            <Stripe />
            <div className={styles.stripes}>
                <div className={styles.stripe1}>
                    <ColStripe />
                </div>
                <div className={styles.stripe2}>
                    <ColStripe />
                </div>
                <div className={styles.stripe3}>
                    <ColStripe />
                </div>
                <div className={styles.stripe4}>
                    <ColStripe />
                </div>
                <div className={styles.stripe5}>
                    <ColStripe />
                </div>
            </div>
            {props.isLoading && 
                <div className={styles['loading-body']}>
                    <div className={styles['loading-wrapper']}>
                        <Loader />
                    </div>
                </div>
            }
            {props.data !== undefined && paginationFilter(props.data, props.page, props.itemsOnPage).map(el => (
                <CarRow
                    onApprove={() => props.onApproveClick(el.id)}
                    onOpenInfo={() => props.onInfoClick(el.id)}
                    key={el.id}
                    data={el}
                />
            ))}
        </div>
    )
}

export default Table