import { FC, useEffect, useState } from "react"

import styles from './style.module.scss'
import Loader from "../../../../../../../../../components/ui/loader/loader";
import Typography from "../../../../../../../../../components/ui/typography/typography";
import { useGetFilialQuery } from "../../../../../../../../../services/api/filial";
import { useGetMeQuery } from "../../../../../../../../../services/api/user";
import { ERoles } from "../../../../../../../../../services/types/user";

interface IFilialField {
    filialId: string | undefined
}

const FilialField: FC<IFilialField> = (props) => {
    const [filialTitle, setFilialTitle] = useState("");
    const {data: me} = useGetMeQuery()
    const { data, isLoading, isSuccess } = useGetFilialQuery({id: props.filialId as string}, {skip: props.filialId === undefined})

    useEffect(() => {
        if (props.filialId === undefined) setFilialTitle("—")
        else if (data) setFilialTitle(data.title)
    }, [isSuccess])

    if (me?.role === ERoles.Admin) return null

    return (
        <div className={styles['field']}>
            {isLoading ? (
                <div className={styles['loading-wrapper']}>
                    <Loader />
                </div>
            ) : (
                <Typography variant="body" color="secondary">{filialTitle}</Typography>
            )}
        </div>
    )
}

export default FilialField