import { FC } from "react";
import { IMechanicReport } from "../../../../../../../services/types/analytics";

import styles from './style.module.scss'
import { useGetMeQuery } from "../../../../../../../services/api/user";
import FilialField from "./components/filial-field/filial-field";
import MechanicField from "./components/mechanic-field/mechanic-field";
import Typography from "../../../../../../../components/ui/typography/typography";
import ColStripe from "../../../../../../../components/ui/col-stripe/col-stripe";
import { ERoles } from "../../../../../../../services/types/user";

interface IMechanicRow {
    data: IMechanicReport
}

const MechanicRow: FC<IMechanicRow> = (props) => {
    const { data: me } = useGetMeQuery()

    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <FilialField filialId={props.data.filialId} />
                <MechanicField mechanicId={props.data.mechanicId}/>
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
        </div>
    )
}

export default MechanicRow