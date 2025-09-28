import { FC } from "react";
import { IReceptionistFilialReport } from "../../../../../services/types/analytics";

import styles from './style.module.scss'
import TableHeader from "./components/table-header/table-header";
import Stripe from "../../../../../components/ui/stripe/stripe";
import ColStripe from "../../../../../components/ui/col-stripe/col-stripe";
import Loader from "../../../../../components/ui/loader/loader";
import ReceptionistFilialRow from "./components/receptionist-filial-row/receptionist-filial-row";

interface ITable {
    data: IReceptionistFilialReport[] | undefined
    isLoading: boolean
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
                <div className={styles.stripe6}>
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
                <ReceptionistFilialRow
                    key={el.filialId}
                    data={el}
                />
            ))}
        </div>
    )
}

export default Table