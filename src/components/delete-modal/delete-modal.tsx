import { FC } from 'react'
import Typography from '../ui/typography/typography'
import Stripe from '../ui/stripe/stripe'
import DefaultButton from '../ui/default-button/default-button'

import styles from './style.module.scss'

interface IDeleteModal {
    text: string
    onDelete: () => void
    onClose: () => void
}

const DeleteModal: FC<IDeleteModal> = ({onDelete, text, onClose}) => {
    return (
        <div className={styles.modal}>
            <Typography variant='h2' color='white'>Удаление</Typography>
            <Stripe />
            <div className={styles.info}>
                <Typography variant='h4' color='secondary'>{text}</Typography>
                <div className={styles.buttons}>
                    <DefaultButton variant='outline-danger' onClick={onDelete}>
                        удалить
                    </DefaultButton>
                    <DefaultButton variant='outline-secondary3' onClick={onClose}>
                        отмена
                    </DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal