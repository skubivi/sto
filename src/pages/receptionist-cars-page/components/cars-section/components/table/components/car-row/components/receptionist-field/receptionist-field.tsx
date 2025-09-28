import { FC, useEffect, useState } from "react"

import styles from './style.module.scss'
import Typography from "../../../../../../../../../../components/ui/typography/typography";
import Loader from "../../../../../../../../../../components/ui/loader/loader";
import { useGetUserPersonalDataQuery } from "../../../../../../../../../../services/api/user";

interface IFilialField {
    receptionistId: number
}

const ReceptionistField: FC<IFilialField> = (props) => {
    const [receptionistNames, setReceptionistNames] = useState("");

    const { data, isLoading, isSuccess } = useGetUserPersonalDataQuery({id: props.receptionistId})

    useEffect(() => {
        if (data) setReceptionistNames(`${data.lastName} ${data.firstName[0]}.${data.middleName[0]}.`)
    }, [isSuccess])

    return (
        <div className={styles['field']}>
            {(isLoading) ? (
                <div className={styles['loading-wrapper']}>
                    <Loader />
                </div>
            ) : (
                <Typography variant="body" color="secondary">{receptionistNames}</Typography>
            )}
        </div>
    )
}

export default ReceptionistField