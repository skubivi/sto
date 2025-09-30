import { useEffect, useState } from 'react'
import DefaultButton from '../../../../../../components/ui/default-button/default-button'
import styles from './style.module.scss'
import StyledModal from '../../../../../../components/ui/styled-modal/styled-modal'
import Typography from '../../../../../../components/ui/typography/typography'
import Stripe from '../../../../../../components/ui/stripe/stripe'
import PhoneNumberInput from '../../../../../../components/ui/phone-number-input/phone-number-input'
import { useCheckClientMutation, useLazyGetClientsDataQuery } from '../../../../../../services/api/clients-data'
import { IClientData } from '../../../../../../services/types/clients-data'
import InputWithLabel from '../../../../../../components/ui/input-with-label/input-with-label'
import { usePostCarMutation } from '../../../../../../services/api/cars'

const NewCar = () => {
    const [openModal, setOpenModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isClientExist, setIsClientExist] = useState<boolean | undefined>(undefined)
    const [clientData, setClientData] = useState<IClientData | undefined>(undefined)
    const [carNumber, setCarNumber] = useState('')
    const [mileage, setMileage] = useState<number | undefined>()
    const [fio, setFio] = useState('')
    const [checkClient] = useCheckClientMutation()
    const [getClient] = useLazyGetClientsDataQuery()
    const [newCar] = usePostCarMutation()

    useEffect(() => {
        if (phoneNumber.length === 10) {
            checkClient({phone: '+7' + phoneNumber}).unwrap().then(data => {
                setIsClientExist(data.clientDataId !== '-1')
                if (data.clientDataId !== '-1') {
                    getClient({id: data.clientDataId}).unwrap().then(clData => {
                        setClientData(clData)
                    })
                }
            })
        }
    }, [phoneNumber.length])

    const handleSetCarNumber: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value === '' || e.target.value === undefined) return setMileage(undefined)
        if (!Number.isNaN(Number.parseFloat(e.target.value))) return setMileage(Number.parseFloat(e.target.value))
        return undefined
    }
    const disableSubmit = phoneNumber.length < 10 || mileage === undefined || carNumber.length !== 6 || (!isClientExist && fio.split(' ').length !== 3)
    const handleSubmit = () => {
        if (disableSubmit) return
        const lastName = isClientExist === true ? undefined : fio.split(' ')[0]
        const firstName = isClientExist === true ? undefined : fio.split(' ')[1]
        const middleName = isClientExist === true ? undefined : fio.split(' ')[2]
        const clientToPost: {
            phone: string
            firstName?: string
            lastName?: string
            middleName?: string
        } = {
            phone: '+7' + phoneNumber
        }
        if (lastName) clientToPost.lastName = lastName
        if (firstName) clientToPost.firstName = firstName
        if (middleName) clientToPost.middleName = middleName
        newCar({
            carNumber,
            mileage,
            client: clientToPost
        })
        setPhoneNumber('')
        setCarNumber('')
        setIsClientExist(undefined)
        setClientData(undefined)
        setMileage(undefined)
        setFio('')
        setOpenModal(false)
    }
    return (
        <div className={styles.container}>
            {openModal &&
                <StyledModal open={openModal} onClose={() => setOpenModal(false)}>
                    <div className={styles.modal}>
                        <Typography variant='h2' color='white'>Новая машина</Typography>
                        <Stripe />
                        <div className={styles.inputs}>
                            <PhoneNumberInput label='Номер телефона клиента' value={phoneNumber} setValue={setPhoneNumber} />
                            {isClientExist === true && clientData && phoneNumber.length === 10 &&
                                <div>
                                    <Typography variant='caption' color='secondary3'>ФИО клиента</Typography>
                                    <Typography variant='subtitle' color='secondary'>{clientData.lastName + ' ' + clientData.firstName + ' ' + clientData.middleName}</Typography>
                                </div>
                            }
                            {isClientExist === false && phoneNumber.length === 10 &&
                                <InputWithLabel label='ФИО клиента' onChange={(e) => setFio(e.target.value)} value={fio}/>
                            }
                            <InputWithLabel label='Номер машины' onChange={(e) => setCarNumber(e.target.value)} value={carNumber}/>
                            <InputWithLabel label='Пробег' onChange={handleSetCarNumber} value={mileage ?? ''}/>
                        </div>
                        <DefaultButton variant='outline-primary' disabled={disableSubmit} onClick={handleSubmit}>создать</DefaultButton>
                    </div>
                </StyledModal>
            }
            <div className={styles['button-container']}>
                <DefaultButton variant='primary' onClick={() => setOpenModal(true)}>новая машина</DefaultButton>
            </div>
        </div>
    )
}

export default NewCar