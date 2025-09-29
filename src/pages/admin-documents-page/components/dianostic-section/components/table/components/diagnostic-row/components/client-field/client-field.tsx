import { FC, useEffect, useState } from "react"

import styles from './style.module.scss'
import ColStripe from "../../../../../../../../../../components/ui/col-stripe/col-stripe";
import Typography from "../../../../../../../../../../components/ui/typography/typography";
import Loader from "../../../../../../../../../../components/ui/loader/loader";
import { useGetClientsDataQuery } from "../../../../../../../../../../services/api/clients-data";

interface IFilialField {
    clientDataId: string
}

const ClientField: FC<IFilialField> = (props) => {
    const [clientNames, setClientNames] = useState("");
    const { data, isLoading, isSuccess } = useGetClientsDataQuery({id: props.clientDataId})

    useEffect(() => {
        if (data) setClientNames(`${data.lastName} ${data.firstName[0]}.${data.middleName[0]}.`)
    }, [isSuccess])

    return (
        <>
            <div className={styles.stripe}>
                <ColStripe />
            </div>
            <div className={styles['field']}>
                {isLoading ? (
                    <div className={styles['loading-wrapper']}>
                        <Loader />
                    </div>
                ) : (
                    <Typography variant="body" color="secondary">{clientNames}</Typography>
                )}
            </div>
        </>
    )
}

export default ClientField