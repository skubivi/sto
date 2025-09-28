import { FC } from "react";
import { IMechanicFilialReport } from "../../../../../../../services/types/analytics";

import styles from './style.module.scss'
import FilialField from "./components/filial-field/filial-field";
import Typography from "../../../../../../../components/ui/typography/typography";
import ColStripe from "../../../../../../../components/ui/col-stripe/col-stripe";

interface IMechanicFilialRow {
    data: IMechanicFilialReport
}

const MechanicFilialRow: FC<IMechanicFilialRow> = (props) => {
    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <FilialField filialId={props.data.filialId} />
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['dianostic-count']}>
                    <Typography variant="body" color="secondary">{props.data.diagnosticsCount}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['works-count']}>
                    <Typography variant="body" color="secondary">{props.data.worksCount}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['average-diangostic']}>
                    <Typography variant="body" color="secondary">{props.data.worksAverage}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['reports-count']}>
                    <Typography variant="body" color="secondary">{props.data.reportsCount}</Typography>
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
            </div>
        </div>
    )
}

export default MechanicFilialRow