import { FC } from "react"
import { IReceptionistFilialReport } from "../../../../../../../services/types/analytics"

import styles from './style.module.scss'
import FilialField from "./components/filial-field/filial-field"
import Typography from "../../../../../../../components/ui/typography/typography"
import ColStripe from "../../../../../../../components/ui/col-stripe/col-stripe"

interface IReceptionistRow {
    data: IReceptionistFilialReport
}

const ReceptionistFilialRow: FC<IReceptionistRow> = (props) => {
    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <FilialField filialId={props.data.filialId} />
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['cars-count']}>
                    <Typography variant="body" color="secondary">{props.data.carsCount}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['cars-processed']}>
                    <Typography variant="body" color="secondary">{props.data.carsProcessed}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['processed-percent']}>
                    <Typography variant="body" color="secondary">{props.data.processedPercent}%</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['cars-given-away']}>
                    <Typography variant="body" color="secondary">{props.data.carsGivenAway}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['reports-given-away']}>
                    <Typography variant="body" color="secondary">{props.data.reportsGivenAway}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['reports-percent']}>
                    <Typography variant="body" color="secondary">{props.data.reportsPercent}%</Typography>
                </div>
            </div>
            <div className={styles['stripe-container']}>
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
        </div>
    )
}

export default ReceptionistFilialRow