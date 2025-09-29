import { FC, useState } from 'react'
import PasswordInput from '../../../../../../components/ui/password-input/password-input'
import Stripe from '../../../../../../components/ui/stripe/stripe'
import Typography from '../../../../../../components/ui/typography/typography'
import DefaultButton from '../../../../../../components/ui/default-button/default-button'
import { useChangePersonPasswordMutation } from '../../../../../../services/api/personal'

import styles from './style.module.scss'

interface IChangePasswordModal {
    id: string
    onClose: () => void
}

const ChangePasswordModal: FC<IChangePasswordModal> = ({id, onClose}) => {
    const [changePassword] = useChangePersonPasswordMutation()

    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const handleButtonClick = () => {
        changePassword({
            id,
            password: password,
        })
        onClose()
    }
    return (
        <div className={styles.modal}>
            <Typography variant='h2' color='white'>Сбросить пароль</Typography>
            <Stripe />
            <div className={styles.inputs}>
                <PasswordInput label='Новый пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
                <PasswordInput label='Подтвердите пароль' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
            </div>
            <DefaultButton variant='outline-primary' onClick={handleButtonClick}>установить пароль</DefaultButton>
        </div>
    )
}

export default ChangePasswordModal