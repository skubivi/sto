import { FC } from "react";
import { IMechanicReport } from "../../../../../services/types/analytics";
import { useGetMeQuery } from "../../../../../services/api/user";

import styles from './style.module.scss'
import TableHeader from "./components/table-header/table-header";
import Stripe from "../../../../../components/ui/stripe/stripe";
import { ERoles } from "../../../../../services/types/user";
import ColStripe from "../../../../../components/ui/col-stripe/col-stripe";
import Loader from "../../../../../components/ui/loader/loader";
import MechanicRow from "./components/mechanic-row/mechanic-row";

interface ITable {
    data: IMechanicReport[] | undefined
    isLoading: boolean
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
            {props.data !== undefined && props.data.map(el => (
                <MechanicRow
                    key={el.mechanicId}
                    data={el}
                />
            ))}
        </div>
    )
}

export default Table