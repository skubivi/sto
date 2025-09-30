import styles from './style.module.scss'

import LogoMiniPng from '../../assets/logo-mini.png'
import AdminRoutes from './components/admin-routes/admin-routes'
import { useGetMeQuery } from '../../services/api/user'
import { ERoles } from '../../services/types/user'
import ReceptionistRoutes from './components/receptionist-routes/receptionist-routes'

const Sidebar = () => {
    const {data: user} = useGetMeQuery()

    if (user?.role === ERoles.Mechanic) return null

    return (
        <div className={styles.sidebar}>
            <div className={styles['logo-container']}>
                <div className={styles.back}></div>
                <img src={LogoMiniPng} />
            </div>
            {(user?.role === ERoles.Admin || user?.role === ERoles.FullAdmin) &&
                <AdminRoutes />
            }
            {user?.role === ERoles.Receptionist &&
                <ReceptionistRoutes />
            }
        </div>
    )
}

export default Sidebar