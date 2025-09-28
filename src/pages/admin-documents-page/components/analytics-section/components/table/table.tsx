import { FC } from 'react'
import Stripe from '../../../../../../components/ui/stripe/stripe'

import styles from './style.module.scss'
import Loader from '../../../../../../components/ui/loader/loader'
import ColStripe from '../../../../../../components/ui/col-stripe/col-stripe'
import TableHeader from './components/table-header/table-header'
import { paginationFilter } from '../../../../../../services/utils/helper-functions/pagination'
import { IDocumentReport } from '../../../../../../services/types/documents'
import AnalyticsDocumentRow from './components/analytics-document-row/analytics-document-row'
import { useGetMeQuery } from '../../../../../../services/api/user'
import { ERoles } from '../../../../../../services/types/user'

interface ITable {
    data: IDocumentReport[] | undefined
    isLoading: boolean
    page: number
    itemsOnPage: number
    onCommentsClick: (n: number) => void
}

const Table: FC<ITable> = (props) => {
    const { data: me } = useGetMeQuery()
    return (
        <div className={styles.table}>
            <TableHeader />
            <Stripe />
            <div className={styles.stripes}>
                {me?.role === ERoles.FullAdmin && 
                    <div className={styles.stripe1}>
                        <ColStripe />
                    </div>
                }
                <div className={styles.stripe2}>
                    <ColStripe />
                </div>
                <div className={styles.stripe3}>
                    <ColStripe />
                </div>
                <div className={styles.stripe4}>
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
                <AnalyticsDocumentRow
                    onOpenComments={() => props.onCommentsClick(el.id)}
                    key={el.id}
                    data={el}
                />
            ))}
        </div>
    )
}

export default Table