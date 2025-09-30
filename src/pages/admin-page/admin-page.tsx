import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UrlRoutes } from "../../services/routes/url-routes"
import { useGetMyFilialQuery } from "../../services/api/filial"
import { useEffect } from "react"
import { setFilialToLocalStorage } from "../../services/utils/helper-functions/filial"
import { useGetMeQuery } from "../../services/api/user"
import { ERoles } from "../../services/types/user"

const AdminPage = () => {
    const location = useLocation()

    const { data: filial, isSuccess } = useGetMyFilialQuery()
    const { data: me, isMeSuccess } = useGetMeQuery()
    useEffect(() => {
        if (filial && me?.role === ERoles.Admin) setFilialToLocalStorage(filial.id)
        else if (me?.role === ERoles.FullAdmin) setFilialToLocalStorage(null)
        
    }, [isSuccess, isMeSuccess])

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