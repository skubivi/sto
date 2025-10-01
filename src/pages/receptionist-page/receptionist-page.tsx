import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UrlRoutes } from "../../services/routes/url-routes"
import { getFilialFromLocalStorage, setFilialToLocalStorage } from "../../services/utils/helper-functions/filial"
import { useGetFilialsQuery } from "../../services/api/filial"
import { useEffect, useState } from "react"
import Loader from "../../components/ui/loader/loader"

import styles from './styles.module.scss'

const ReceptionistPage = () => {
    const location = useLocation()

    const filial = getFilialFromLocalStorage()
    const { data: filials, isSuccess, isLoading: isFilialsLoading } = useGetFilialsQuery()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (filial === null) {
            if (filials && filials.data.length > 0) setFilialToLocalStorage(filials.data[0].id)
        }

        if (!isFilialsLoading) setIsLoading(false)
    }, [isSuccess])

    if (isLoading || filial === null) return (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <Loader />
            </div>
        </div>
    )

    if (
        location.pathname !== UrlRoutes.ReceptionistCars && 
        location.pathname !== UrlRoutes.ReceptionistDocuments &&
        location.pathname !== UrlRoutes.ReceptionistSettings
    ) return (
        <Navigate to={UrlRoutes.ReceptionistCars}/>
    )

    return (
        <Outlet />
    )
}

export default ReceptionistPage