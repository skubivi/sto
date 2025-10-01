import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UrlRoutes } from "../../services/routes/url-routes"
import { useGetMyFilialQuery } from "../../services/api/filial"
import { useEffect, useState } from "react"
import { setFilialToLocalStorage } from "../../services/utils/helper-functions/filial"
import { useGetMeQuery } from "../../services/api/user"
import { ERoles } from "../../services/types/user"
import Loader from "../../components/ui/loader/loader"

import styles from './styles.module.scss'

const AdminPage = () => {
    const location = useLocation()

    const { data: filial, isSuccess, isLoading: isFilialLoading } = useGetMyFilialQuery()
    const { data: me, isSuccess: isMeSuccess, isLoading: isMeLoading } = useGetMeQuery()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (filial && me?.role === ERoles.Admin) setFilialToLocalStorage(filial.id)
        else if (me?.role === ERoles.FullAdmin) setFilialToLocalStorage(null)
        

        if (!isFilialLoading && !isMeLoading)
            setIsLoading(false)
    }, [isSuccess, isMeSuccess])

    if (isLoading) return (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <Loader />
            </div>
        </div>
    )

    if (
        location.pathname !== UrlRoutes.AdminAnalytics && 
        location.pathname !== UrlRoutes.AdminDocuments &&
        location.pathname !== UrlRoutes.AdminFilials &&
        location.pathname !== UrlRoutes.AdminPersonal &&
        location.pathname !== UrlRoutes.AdminSettings
    ) return (
        <Navigate to={UrlRoutes.AdminDocuments}/>
    )

    return (
        <Outlet />
    )
}

export default AdminPage