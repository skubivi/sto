import { FC } from "react"

import styles from './style.module.scss'
import ColStripe from "../../../../../../../../components/ui/col-stripe/col-stripe"
import Typography from "../../../../../../../../components/ui/typography/typography"

import DeleteSvg from '../../../../../../../../assets/pages/admin-filial-page/backspace.svg?react'
import ChangeSvg from '../../../../../../../../assets/pages/admin-personal-page/password-reset.svg?react'

interface IPersonalRow {
    createdAt: Date
    firstName: string
    lastName: string
    middleName: string
    openDeleteModal: () => void
    openChangePasswordModal: () => void
}

const PersonalRow: FC<IPersonalRow> = (props) => {
    const createdAtDate = new Date(props.createdAt)
    const createdAtText = 
        createdAtDate.getDate().toString().padStart(2, '0') + '.' +
        (createdAtDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
        createdAtDate.getFullYear().toString()
    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <div className={styles.title}>
                    <Typography variant="body" color="secondary">{props.lastName} {props.firstName} {props.middleName}</Typography>
                </div>
                <div className={styles.stripe3}>
                    <ColStripe />
                </div>
                <div className={styles['created-at']}>
                    <Typography variant="body" color="secondary">{createdAtText}</Typography>
                </div>
                <div className={styles.stripe3}>
                    <ColStripe />
                </div>
                <div className={styles['actions']}>
                    <div onClick={props.openChangePasswordModal} className={styles.icon}>
                        <ChangeSvg />
                    </div>
                    <div onClick={props.openDeleteModal} className={styles.icon}>
                        <DeleteSvg />
                    </div>
                </div>
            </div>
            <div className={styles['stripe-container']}>
                <div className={styles.stripe2}>
                    <ColStripe />
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
            </div>
        </div>
    )
}

export default PersonalRow