import { FC } from 'react'
import DefaultButton from '../../../../../../components/ui/default-button/default-button'
import Stripe from '../../../../../../components/ui/stripe/stripe'
import Typography from '../../../../../../components/ui/typography/typography'
import { useDeclineDocumentMutation } from '../../../../../../services/api/documents'

import styles from './style.module.scss'

interface IDeclineModal {
    documentId: number
    onClose: () => void
}

const DeclineModal: FC<IDeclineModal> = (props) => {
    const [declineDocument] = useDeclineDocumentMutation()

    const handleSubmit = () => {
        declineDocument({id: props.documentId})
        props.onClose()
    }

    return (
        <div className={styles.modal}>
            <Typography variant='h2' color='white'>Отклонение</Typography>
            <Stripe />
            <div className={styles.text}>
                <Typography variant='h4' color='secondary'>Вы действительно хотите отклонить документ?</Typography>
            </div>
            <div className={styles.buttons}>
                <DefaultButton variant='outline-danger' onClick={handleSubmit}>Отклонить</DefaultButton>
                <DefaultButton variant='outline-secondary3' onClick={props.onClose}>Отмена</DefaultButton>
            </div>
        </div>
    )
}

export default DeclineModal