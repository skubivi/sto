import { FC } from "react"
import StyledModal from "../../../../../../components/ui/styled-modal/styled-modal"
import { ICar } from "../../../../../../services/types/cars"
import { useGetClientsDataQuery } from "../../../../../../services/api/clients-data"
import { IClientData } from "../../../../../../services/types/clients-data"
import Typography from "../../../../../../components/ui/typography/typography"

import styles from './style.module.scss'
import DefaultButton from "../../../../../../components/ui/default-button/default-button"
import Loader from "../../../../../../components/ui/loader/loader"
import Stripe from "../../../../../../components/ui/stripe/stripe"
import { useFinishCarMutation } from "../../../../../../services/api/cars"

interface IApproveModal {
    open: boolean
    onClose: () => void
    data: ICar
}

const ApproveModal: FC<IApproveModal> = (props) => {
    const { data: clientsData, isLoading } = useGetClientsDataQuery({id: props.data.clientDataId})
    const getClientsDataNames = (data: IClientData) => data.lastName + ' ' + data.firstName + ' ' + data.middleName
    const getClientsDataPhone = (data: IClientData) => `${data.phone.slice(0, 2)}(${data.phone.slice(2, 5)})${data.phone.slice(5, 8)}-${data.phone.slice(8, 10)}-${data.phone.slice(10)}`
    const [approve] = useFinishCarMutation()
    const handleClick = () => {
        approve({carId: props.data.id})
        props.onClose()
    }
    return (
        <StyledModal open={props.open} onClose={props.onClose}>
            <div className={styles.modal}>
                <Typography variant="h2" color="white">Машина готова</Typography>
                <Stripe />
                <div className={styles.body}>
                    <Typography variant="subtitle" color="secondary">Не забудьте сообщить клиенту о готовности машины</Typography>
                    {(isLoading || !clientsData) ? (
                        <div className={styles["loading-body"]}>
                            <div className={styles['loading-wrapper']}>
                                <Loader />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.info}>
                            <div className={styles.element}>
                                <Typography variant="caption" color="secondary">Номер телефона клиента:</Typography>
                                <Typography variant="h4" color="white">{getClientsDataPhone(clientsData)}</Typography>
                            </div>
                            <div className={styles.element}>
                                <Typography variant="caption" color="secondary">ФИО клиента:</Typography>
                                <Typography variant="h4" color="white">{getClientsDataNames(clientsData)}</Typography>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.buttons}>
                    <DefaultButton variant="outline-primary" onClick={handleClick}>готово</DefaultButton>
                    <DefaultButton variant="outline-secondary3" onClick={props.onClose}>отмена</DefaultButton>
                </div>
            </div>
        </StyledModal>
    )
}

export default ApproveModal