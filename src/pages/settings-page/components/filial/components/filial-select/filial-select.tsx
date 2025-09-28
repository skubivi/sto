import { useState } from "react"
import Loader from "../../../../../../components/ui/loader/loader"
import StyledSelect from "../../../../../../components/ui/styled-select/styled-select"
import Typography from "../../../../../../components/ui/typography/typography"
import { useGetFilialsQuery } from "../../../../../../services/api/filial"
import { useGetMeQuery } from "../../../../../../services/api/user"
import { ERoles } from "../../../../../../services/types/user"
import { getFilialFromLocalStorage, setFilialToLocalStorage } from "../../../../../../services/utils/helper-functions/filial"

import styles from './style.module.scss'

const FilialSelect = () => {
    const [filial, setFilial] = useState(getFilialFromLocalStorage())
    const { data: filials, isLoading } = useGetFilialsQuery()
    const { data: me, isLoading: isMeDataLoading } = useGetMeQuery()

    const myFilial = filials?.data.find(el => el.id === filial)

    const handleChange = (id: number) => {
        setFilial(id)
        setFilialToLocalStorage(id)
    }

    if (isLoading || myFilial === undefined || filials === undefined || isMeDataLoading) return (
        <div className={styles['loader-body']}>
            <div className={styles['loader-wrapper']}>
                <Loader />
            </div>
        </div>
    )

    if (me?.role === ERoles.Admin) return (
        <Typography variant="h3" color="white">{myFilial.title}</Typography>
    )

    return (
        <StyledSelect active={myFilial.id} options={filials.data} onChange={handleChange}/>
    )
}

export default FilialSelect