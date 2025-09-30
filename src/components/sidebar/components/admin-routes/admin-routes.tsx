import styles from './style.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'

// import AnalyticsSvg from '../../../../assets/components/sidebar/analytics.svg?react'
import DocumentsSvg from '../../../../assets/components/sidebar/document.svg?react'
import FilialSvg from '../../../../assets/components/sidebar/filial.svg?react'
import PersonSvg from '../../../../assets/components/sidebar/person.svg?react'
import SettingsSvg from '../../../../assets/components/sidebar/settings.svg?react'
import { UrlRoutes } from '../../../../services/routes/url-routes'
import { useGetMeQuery } from '../../../../services/api/user'
import { ERoles } from '../../../../services/types/user'


const AdminRoutes = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { data: me } = useGetMeQuery()

    if (!me) return null

    const activePage =
        location.pathname === UrlRoutes.AdminAnalytics ? 'Analytics' :
        location.pathname === UrlRoutes.AdminDocuments ? 'Documents' :
        location.pathname === UrlRoutes.AdminFilials ? 'Filials' :
        location.pathname === UrlRoutes.AdminPersonal ? 'Personal' :
        location.pathname === UrlRoutes.AdminSettings ? 'Setings' :
        undefined

    return (
        <nav className={styles.navigation}>
            <div 
                className={`${styles.element} ${activePage === 'Documents' ? styles.active : ''}`}
                onClick={() => navigate(UrlRoutes.AdminDocuments)}
            >
                <DocumentsSvg className={styles.svg} />
            </div>
            {/* <div 
                className={`${styles.element} ${activePage === 'Analytics' ? styles.active : ''}`}
                onClick={() => navigate(UrlRoutes.AdminAnalytics)}
            >
                <AnalyticsSvg className={styles.svg} />
            </div> */}
            <div
                className={`${styles.element} ${activePage === 'Personal' ? styles.active : ''}`}
                onClick={() => navigate(UrlRoutes.AdminPersonal)}
            >
                <PersonSvg className={styles.svg} />
            </div>
            {me.role === ERoles.FullAdmin &&
                <div 
                    className={`${styles.element} ${activePage === 'Filials' ? styles.active : ''}`}
                    onClick={() => navigate(UrlRoutes.AdminFilials)}
                >
                    <FilialSvg className={styles.svg} />
                </div>
            }
            <div 
                className={`${styles.element} ${activePage === 'Setings' ? styles.active : ''}`}
                onClick={() => navigate(UrlRoutes.AdminSettings)}
            >
                <SettingsSvg className={styles.svg} />
            </div>
        </nav>
    )
}

export default AdminRoutes