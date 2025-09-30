import { FC, useState } from 'react'
import { usePostFilialMutation } from '../../../../../../services/api/filial'
import Typography from '../../../../../../components/ui/typography/typography'
import Stripe from '../../../../../../components/ui/stripe/stripe'
import DefaultButton from '../../../../../../components/ui/default-button/default-button'
import InputWithLabel from '../../../../../../components/ui/input-with-label/input-with-label'

import styles from './style.module.scss'

interface IAddModal {
    onClose: () => void
}

const AddModal: FC<IAddModal> = ({onClose}) => {
    const [createFilial] = usePostFilialMutation()
    const [title, setTitle] = useState('')
    const disableButton = title.length === 0
    const handleCreateFilial = () => {
        if (!disableButton) {
            createFilial({
                title,
                address: ''
            })
            onClose()
        }
    }
    return (
        <div className={styles.modal}>
            <Typography variant='h2' color='white'>Новый филиал</Typography>
            <Stripe />
            <div className={styles.info}>
                <InputWithLabel label='Название' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <div className={styles.button}>
                    <DefaultButton variant='outline-primary' onClick={handleCreateFilial} disabled={disableButton}>
                        создать
                    </DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default AddModal