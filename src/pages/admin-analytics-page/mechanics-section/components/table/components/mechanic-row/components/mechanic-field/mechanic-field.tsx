import { FC, useEffect, useState } from "react"

import styles from './style.module.scss'
import { useGetUserPersonalDataQuery } from "../../../../../../../../../services/api/user";
import ColStripe from "../../../../../../../../../components/ui/col-stripe/col-stripe";
import Loader from "../../../../../../../../../components/ui/loader/loader";
import Typography from "../../../../../../../../../components/ui/typography/typography";

interface IFilialField {
    mechanicId: number
}

const MechanicField: FC<IFilialField> = (props) => {
    const [mechanicNames, setMechanicNames] = useState("");

    const { data, isLoading, isSuccess } = useGetUserPersonalDataQuery({id: props.mechanicId})

    useEffect(() => {
        if (data) setMechanicNames(`${data.lastName} ${data.firstName[0]}.${data.middleName[0]}.`)
    }, [isSuccess])

    return (
        <>
            <div className={styles.stripe}>
                <ColStripe />
            </div>
            <div className={styles['field']}>
                {(isLoading) ? (
                    <div className={styles['loading-wrapper']}>
                        <Loader />
                    </div>
                ) : (
                    <Typography variant="body" color="secondary">{mechanicNames}</Typography>
                )}
            </div>
        </>
    )
}

export default MechanicField