import DefaultButton from '../../../../../components/ui/default-button/default-button'
import PasswordInput from '../../../../../components/ui/password-input/password-input'
import Typography from '../../../../../components/ui/typography/typography'
import styles from './style.module.scss'

const ChangePasswordModal = () => {
    return (
        <div className={styles.modal}>
            <Typography variant='h2' color='white'>
                Смена пароля
            </Typography>
            <div className={styles.stripe}/>
            <div className={styles.inputs}>
                <PasswordInput label='Старый пароль'/>
                <PasswordInput label='Старый пароль'/>
                <PasswordInput label='Старый пароль'/>
            </div>
            <div className={styles.button}>
                <DefaultButton variant='outline-primary'>
                    установить пароль
                </DefaultButton>
            </div>
        </div>
    )
}

export default ChangePasswordModal