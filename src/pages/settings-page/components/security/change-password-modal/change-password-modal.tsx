import { FC, useState } from 'react'
import DefaultButton from '../../../../../components/ui/default-button/default-button'
import PasswordInput from '../../../../../components/ui/password-input/password-input'
import Typography from '../../../../../components/ui/typography/typography'
import { useChangeMyPasswordMutation } from '../../../../../services/api/auth'
import styles from './style.module.scss'

interface IChangePasswordModal {
    onClose: () => void
}

const ChangePasswordModal: FC<IChangePasswordModal> = (props) => {
    const [changePassword] = useChangeMyPasswordMutation()
    const [prevPassword, setPrevPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const handleSubmit = () => {
        if (newPassword === confPassword && prevPassword.length > 0 && newPassword.length > 0) {
            changePassword({prevPassword, newPassword})
            props.onClose()
        }
    }

    return (
        <div className={styles.modal}>
            <Typography variant='h2' color='white'>
                Смена пароля
            </Typography>
            <div className={styles.stripe}/>
            <div className={styles.inputs}>
                <PasswordInput label='Старый пароль' value={prevPassword} onChange={(e) => setPrevPassword(e.target.value)}/>
                <PasswordInput label='Новый пароль' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                <PasswordInput label='Подтвердите пароль' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
            </div>
            <div className={styles.button}>
                <DefaultButton variant='outline-primary' onClick={handleSubmit}>
                    установить пароль
                </DefaultButton>
            </div>
        </div>
    )
}

export default ChangePasswordModal