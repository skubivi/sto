import { FC, useEffect, useState } from "react"

import styles from './style.module.scss'
import { useGetMeQuery } from "../../../../../../../../../../services/api/user";
import { ERoles } from "../../../../../../../../../../services/types/user";
import { useGetFilialsQuery } from "../../../../../../../../../../services/api/filial";
import ColStripe from "../../../../../../../../../../components/ui/col-stripe/col-stripe";
import Typography from "../../../../../../../../../../components/ui/typography/typography";
import Loader from "../../../../../../../../../../components/ui/loader/loader";

interface IFilialField {
    filialId: string[] | undefined | null
}

const FilialField: FC<IFilialField> = (props) => {
    const [filialTitle, setFilialTitle] = useState("");
    const {data: me} = useGetMeQuery()
    const skip = props.filialId === undefined || props.filialId === null || props.filialId.length > 1
    const { data, isLoading, isSuccess } = useGetFilialsQuery(undefined, {skip})

    useEffect(() => {
        if (skip) setFilialTitle("—")
        else if (data) setFilialTitle(data.data.find(el => el.id === (props.filialId as string[])[0])?.title as string)
    }, [isSuccess])

    if (me?.role === ERoles.Admin) return null

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
                    <Typography variant="body" color="secondary">{filialTitle}</Typography>
                )}
            </div>
        </>
    )
}

export default FilialField