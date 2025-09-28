import { FC, useEffect, useState } from "react"

import styles from './style.module.scss'
import { useGetMeQuery } from "../../../../../../../../../../services/api/user";
import { ERoles } from "../../../../../../../../../../services/types/user";
import { useGetFilialQuery } from "../../../../../../../../../../services/api/filial";
import ColStripe from "../../../../../../../../../../components/ui/col-stripe/col-stripe";
import Typography from "../../../../../../../../../../components/ui/typography/typography";
import Loader from "../../../../../../../../../../components/ui/loader/loader";

interface IFilialField {
    filialId: number[] | undefined
}

const FilialField: FC<IFilialField> = (props) => {
    const [filialTitle, setFilialTitle] = useState("");
    const {data: me} = useGetMeQuery()
    const skip = props.filialId === undefined || props.filialId.length > 1
    const { data, isLoading, isSuccess } = useGetFilialQuery({id: (props.filialId as number[])[0]}, {skip})

    useEffect(() => {
        if (skip) setFilialTitle("—")
        else if (data) setFilialTitle(data.title)
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