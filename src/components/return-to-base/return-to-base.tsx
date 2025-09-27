import { Navigate, useLocation } from "react-router-dom"
import { UrlRoutes } from "../../services/routes/url-routes"

const ReturnToBase = () => {
    const location = useLocation()

    return (
        <Navigate to={location.state?.from ? location.state.from : UrlRoutes.Base} replace />
    )
}

export default ReturnToBase