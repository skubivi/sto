import styles from './style.module.scss';

import { FC } from "react";
import { useGetMeQuery } from "../../services/api/user";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UrlRoutes } from "../../services/routes/url-routes";
import Loader from "../ui/loader/loader";

const ProtectedRoute: FC = () => {
    const { data: user, isLoading } = useGetMeQuery()
    const location = useLocation()

    if (isLoading) return (
        <div className={styles['loader-container']}>
            <div className={styles['loader']}>
                <Loader />
            </div>
        </div>
    )

    if (!user)
        return (
            <Navigate to={UrlRoutes.Login} state={{ from: location.pathname + location.search }}/>
        )
    
    return <Outlet />;
}

export default ProtectedRoute