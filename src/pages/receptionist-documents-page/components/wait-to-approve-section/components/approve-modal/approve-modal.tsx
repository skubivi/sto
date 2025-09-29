import { FC } from 'react'
import DefaultButton from '../../../../../../components/ui/default-button/default-button'
import Stripe from '../../../../../../components/ui/stripe/stripe'
import Typography from '../../../../../../components/ui/typography/typography'
import { useApproveDocumentMutation } from '../../../../../../services/api/documents'

import styles from './style.module.scss'

interface IApproveModal {
    documentId: string
    onClose: () => void
}

const ApproveModal: FC<IApproveModal> = (props) => {
    const [approveDocument] = useApproveDocumentMutation()

    const handleSubmit = () => {
        approveDocument({id: props.documentId})
        props.onClose()
    }

    return (
        <div className={styles.modal}>
            <Typography variant='h2' color='white'>Подтверждение</Typography>
            <Stripe />
            <div className={styles.text}>
                <Typography variant='h4' color='secondary'>После утверждения документа он отправится к клиенту</Typography>
            </div>
            <div className={styles.buttons}>
                <DefaultButton variant='outline-danger' onClick={handleSubmit}>утвердить</DefaultButton>
                <DefaultButton variant='outline-secondary3' onClick={props.onClose}>Отмена</DefaultButton>
            </div>
        </div>
    )
}

export default ApproveModal