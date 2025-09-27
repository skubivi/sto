import { FC } from "react";
import { useGetMeQuery } from "../../services/api/user";
import { Outlet } from "react-router-dom";
import { ERoles } from "../../services/types/user";
import ReturnToBase from "../return-to-base/return-to-base";

const FullAdminProtectedRoute: FC = () => {
    const { data: user } = useGetMeQuery()

    if (user?.role !== ERoles.FullAdmin) return (
        <ReturnToBase />
    )

    return <Outlet />;
}

export default FullAdminProtectedRoute