import styles from './style.module.scss';

import LogoPng from '../../assets/logo.png'
import InputWithLabel from '../../components/ui/input-with-label/input-with-label';
import PasswordInput from '../../components/ui/password-input/password-input';
import DefaultButton from '../../components/ui/default-button/default-button';
import { usePostLoginMutation } from '../../services/api/auth';
import { useState } from 'react';
import { useGetMeQuery } from '../../services/api/user';
import Loader from '../../components/ui/loader/loader';
import ReturnToBase from '../../components/return-to-base/return-to-base';

const LoginPage = () => {
    const [login] = usePostLoginMutation()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
        login({
            identifier,
            password
        })
    }

    const { data: user, isLoading: userLoading } = useGetMeQuery()

    if (userLoading) return (
            <div className={styles['loader-container']}>
                <div className={styles['loader']}>
                    <Loader />
                </div>
            </div>
        )

    if (user) return (
        <ReturnToBase />
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <div className={styles.back}/>
                <img className={styles.logo} src={LogoPng} />
                <div className={styles.stripe}/>
                <div className={styles.fields}>
                    <div className={styles.inputs}>
                        <InputWithLabel label='Логин' value={identifier} onChange={(e) => setIdentifier(e.target.value)}/>
                        <PasswordInput label='Пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <DefaultButton variant='primary' onClick={handleClick}>
                        войти
                    </DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default LoginPage