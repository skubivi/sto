import { FC } from "react"
import StyledModal from "../../../../../../components/ui/styled-modal/styled-modal"
import { ECarStatus, ICar } from "../../../../../../services/types/cars"
import { useGetClientsDataQuery } from "../../../../../../services/api/clients-data"
import Typography from "../../../../../../components/ui/typography/typography"

import styles from './style.module.scss'
import Stripe from "../../../../../../components/ui/stripe/stripe"
import Loader from "../../../../../../components/ui/loader/loader"
import { IClientData } from "../../../../../../services/types/clients-data"
import InfoDocuments from "./components/info-documents/info-documents"

interface IInfoModal {
    open: boolean
    onClose: () => void
    data: ICar
}

const InfoModal: FC<IInfoModal> = (props) => {
    const { data: clientsData, isLoading } = useGetClientsDataQuery({id: props.data.clientDataId})
    const getClientsDataNames = (data: IClientData) => data.lastName + ' ' + data.firstName + ' ' + data.middleName
    const getClientsDataPhone = (data: IClientData) => `${data.phone.slice(0, 2)}(${data.phone.slice(2, 5)})${data.phone.slice(5, 8)}-${data.phone.slice(8, 10)}-${data.phone.slice(10)}`
    const statusText 
        = props.data.status === ECarStatus.Created ? 'В приемке'
        : props.data.status === ECarStatus.Processed ? 'Продиагностирована'
        : 'Отдана'
    const createdAt = new Date(props.data.createdAt)
    const createdAtText = `${createdAt.getDate().toString().padStart(2, '0')}.${(createdAt.getMonth() + 1).toString().padStart(2, '0')}.${createdAt.getFullYear()}`
    return (
        <StyledModal open={props.open} onClose={props.onClose}>
            <div className={styles.modal}>
                <Typography variant="h2" color="white">Информация</Typography>
                <Stripe />
                <div className={styles.info}>
                    {(isLoading || !clientsData) ? (
                        <div className="loading-body">
                            <div className="loading-wrapper">
                                <Loader />
                            </div>
                        </div>
                    ) : (
                        <>
                            <Typography variant="caption" color="secondary3">ФИО клиента</Typography>
                            <Typography variant="body-small" color="secondary">{getClientsDataNames(clientsData)}</Typography>
                        </>
                    )}
                </div>
                <div className={styles.info}>
                    <Typography variant="caption" color="secondary3">Номер машины</Typography>
                    <Typography variant="body-small" color="secondary">{props.data.carNumber.toUpperCase()}</Typography>
                </div>
                <div className={styles.info}>
                    {(isLoading || !clientsData) ? (
                        <div className="loading-body">
                            <div className="loading-wrapper">
                                <Loader />
                            </div>
                        </div>
                    ) : (
                        <>
                            <Typography variant="caption" color="secondary3">Номер телефона клиента</Typography>
                            <Typography variant="body-small" color="secondary">{getClientsDataPhone(clientsData)}</Typography>
                        </>
                    )}
                </div>
                <div className={styles.info}>
                    <Typography variant="caption" color="secondary3">Статус</Typography>
                    <Typography variant="body-small" color="secondary">{statusText}</Typography>
                </div>
                <div className={styles.info}>
                    <Typography variant="caption" color="secondary3">Дата поступления в приемку</Typography>
                    <Typography variant="body-small" color="secondary">{createdAtText}</Typography>
                </div>
                <div className={styles.info}>
                    <InfoDocuments carId={props.data.id} />
                </div>
            </div>
        </StyledModal>
    )
}

export default InfoModal