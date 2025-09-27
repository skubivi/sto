import { FC } from "react";
import { useGetMeQuery } from "../../services/api/user";
import { Navigate, Outlet } from "react-router-dom";
import { ERoles } from "../../services/types/user";
import { UrlRoutes } from "../../services/routes/url-routes";

const RoleRoute: FC = () => {
    const { data: user } = useGetMeQuery()

    if (user?.role === ERoles.Admin || user?.role === ERoles.FullAdmin)
        return <Navigate to={UrlRoutes.Admin}/>
    if (user?.role === ERoles.Receptionist)
        return <Navigate to={UrlRoutes.Receptionist}/>

    return <Outlet />;
}

export default RoleRoute