import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UrlRoutes } from "../../services/routes/url-routes"

const ReceptionistPage = () => {
    const location = useLocation()

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