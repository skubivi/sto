import { useEffect, useState } from 'react'
import DefaultButton from '../../../../../../components/ui/default-button/default-button'
import styles from './style.module.scss'
import StyledModal from '../../../../../../components/ui/styled-modal/styled-modal'
import Typography from '../../../../../../components/ui/typography/typography'
import Stripe from '../../../../../../components/ui/stripe/stripe'
import { usePostPersonMutation } from '../../../../../../services/api/personal'
import { useGetMeQuery } from '../../../../../../services/api/user'
import { ERoles } from '../../../../../../services/types/user'
import InputWithLabel from '../../../../../../components/ui/input-with-label/input-with-label'
import PasswordInput from '../../../../../../components/ui/password-input/password-input'
import StyledSelectWithLabel from '../../../../../../components/ui/styled-select-with-label/styled-select-with-label'

const fullAdminOptions = [
    {
        id: ERoles.Receptionist,
        title: 'Приемщик'
    },
    {
        id: ERoles.Mechanic,
        title: 'Механик'
    },
    {
        id: ERoles.FullAdmin,
        title: 'Администратор'
    },
    {
        id: ERoles.Admin,
        title: 'Администратор фил.'
    },
]

const adminOptions = [
    {
        id: ERoles.Receptionist,
        title: 'Приемщик'
    },
    {
        id: ERoles.Mechanic,
        title: 'Механик'
    },
]

const AddPersonal = () => {
    const [createPerson] = usePostPersonMutation()
    const { data: me } = useGetMeQuery()

    const [openModal, setOpenModal] = useState(false)
    const [firstWindow, setFirstWindow] = useState(true)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')

    const [password, setPassword] = useState('')
    const [identifier, setIdentifier] = useState('')

    useEffect(() => {
        setFirstWindow(true)
        setFirstName('')
        setLastName('')
        setMiddleName('')
        setPassword('')
        setIdentifier('')
        setRole(ERoles.Receptionist)
    }, [openModal])

    const [role, setRole] = useState(ERoles.Receptionist)

    if (!me) return

    const handleChangeRole = (r: ERoles) => {
        setRole(r)
    }

    const handlePrimaryButtonClick = () => {
        if (firstWindow && password && identifier) setFirstWindow(false)
        else {
            createPerson({
                firstName,
                lastName,
                middleName,
                password,
                identifier,
                role
            })
            setOpenModal(false)
        }
    }

    return (
        <div className={styles['add-personal']}>
            <div className={styles['button-container']}>
                <DefaultButton variant='primary' onClick={() => setOpenModal(true)}>
                    добавить сотрудника
                </DefaultButton>
            </div>
            {openModal &&
                <StyledModal open={openModal} onClose={() => setOpenModal(false)}>
                    <div className={styles.modal}>
                        <Typography variant='h2' color='white'>Новый сотрудник</Typography>
                        <Stripe />
                        <div className={styles.inputs}>
                            {firstWindow ? (
                                <>
                                    <InputWithLabel label='Логин' value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                                    <PasswordInput label='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </>
                            ) : (
                                <>
                                    <InputWithLabel label='Фамилия' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    <InputWithLabel label='Имя' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    <InputWithLabel label='Отчество' value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                                    <StyledSelectWithLabel 
                                        label='Роль' 
                                        active={role} 
                                        options={me.role === ERoles.Admin ? adminOptions : fullAdminOptions}
                                        onChange={handleChangeRole}
                                    />
                                </>
                            )}
                        </div>
                        <div className={styles.buttons}>
                            <DefaultButton variant='outline-primary' onClick={handlePrimaryButtonClick}>
                                {firstWindow ? 'Дальше' : 'Создать'}
                            </DefaultButton>
                            {!firstWindow &&
                                <DefaultButton variant='outline-secondary3' onClick={() => setFirstWindow(true)}>
                                    назад
                                </DefaultButton>
                            }
                        </div>
                    </div>
                </StyledModal>
            }
        </div>
    )
}

export default AddPersonal