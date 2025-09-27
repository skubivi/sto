import { useEffect, useState } from "react"
import InputWithLabel from "../../../../components/ui/input-with-label/input-with-label"
import Section from "../../../../components/ui/section/section"
import DefaultButton from "../../../../components/ui/default-button/default-button"

import styles from './style.module.scss'
import Typography from "../../../../components/ui/typography/typography"
import { useGetPersonalDataQuery, usePatchPersonalDataMutation } from "../../../../services/api/user"


const Personal = () => {
    const {data: personal, isSuccess: isPersonalSuccess} = useGetPersonalDataQuery()
    const [changePersonal] = usePatchPersonalDataMutation()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')

    useEffect(() => {
        if (personal) {
            setFirstName(personal.firstName ?? '')
            setLastName(personal.lastName ?? '')
            setMiddleName(personal.middleName ?? '')
        }
    }, [isPersonalSuccess])

    const getOnChange = (func: React.Dispatch<React.SetStateAction<string>>) => {
        const result: React.ChangeEventHandler<HTMLInputElement> = (e) => {
            func(e.target.value)
        }

        return result
    }

    const handleSavePersonal = () => {
        changePersonal({
            firstName,
            lastName,
            middleName
        })
    }

    return (
        <div className={styles.personal}>
            <Typography variant="h2" color="black">Персональные данные</Typography>
            <Section>
                <div className={styles.inputs}>
                    <InputWithLabel label="Фамилия" value={lastName} onChange={getOnChange(setLastName)}/>
                    <InputWithLabel label="Имя" value={firstName} onChange={getOnChange(setFirstName)}/>
                    <InputWithLabel label="Отчество" value={middleName} onChange={getOnChange(setMiddleName)}/>
                </div>
                <div className={styles.stripe}/>
                <div className={styles.button}>
                    <DefaultButton onClick={handleSavePersonal} variant="primary">
                        Сохранить
                    </DefaultButton>
                </div>
            </Section>
        </div>
    )
}

export default Personal