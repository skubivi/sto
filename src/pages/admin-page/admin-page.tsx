import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UrlRoutes } from "../../services/routes/url-routes"

const AdminPage = () => {
    const location = useLocation()
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