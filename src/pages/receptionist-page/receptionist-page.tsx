import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UrlRoutes } from "../../services/routes/url-routes"
import { getFilialFromLocalStorage, setFilialToLocalStorage } from "../../services/utils/helper-functions/filial"
import { useGetFilialsQuery } from "../../services/api/filial"
import { useEffect } from "react"

const ReceptionistPage = () => {
    const location = useLocation()

    const filial = getFilialFromLocalStorage()
    const { data: filials, isSuccess } = useGetFilialsQuery()
    useEffect(() => {
        if (filial === null) {
            if (filials && filials.data.length > 0) setFilialToLocalStorage(filials.data[0].id)
        }
    }, [isSuccess])

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