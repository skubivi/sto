import { FC } from "react"
import ColStripe from "../../../../../../../../components/ui/col-stripe/col-stripe"
import Typography from "../../../../../../../../components/ui/typography/typography"
import ClientField from "./components/client-field/client-field"
import styles from './style.module.scss'
import { ECarStatus, ICar } from "../../../../../../../../services/types/cars"
import ReceptionistField from "./components/receptionist-field/receptionist-field"

import ApproveSvg from '../../../../../../../../assets/pages/receptionist-car-page/check_circle.svg?react'
import InfoSvg from '../../../../../../../../assets/pages/receptionist-car-page/info.svg?react'

interface IPersonalRow {
    data: ICar
    onApprove: () => void
    onOpenInfo: () => void
}

const CarRow: FC<IPersonalRow> = (props) => {
    const createdAtDate = new Date(props.data.createdAt)
    const createdAtText = 
        createdAtDate.getDate().toString().padStart(2, '0') + '.' +
        (createdAtDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
        createdAtDate.getFullYear().toString()
    const statusText
        = props.data.status === ECarStatus.Created ? 'В приемке'
        : props.data.status === ECarStatus.Finished ? 'Отдана'
        : 'Продиагностирована'

    const handleApprove = () => {
        if (props.data.status !== ECarStatus.Finished) props.onApprove()
    }

    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <ReceptionistField receptionistId={props.data.receptionistId}/>
                <ClientField clientDataId={props.data.clientDataId}/>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['car-number']}>
                    <Typography variant="body" color="secondary">{props.data.carNumber}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['status']}>
                    <Typography variant="body" color="secondary">{statusText}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['created-at']}>
                    <Typography variant="body" color="secondary">{createdAtText}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['actions']}>
                    <div className={`${styles.icon} ${props.data.status === ECarStatus.Finished && styles.disabled}`} onClick={handleApprove}>
                        <ApproveSvg />
                    </div>
                    <div className={styles.icon} onClick={props.onOpenInfo}>
                        <InfoSvg />
                    </div>
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
            </div>
        </div>
    )
}

export default CarRow