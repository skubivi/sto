import styles from './style.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'

import ConstructionSvg from '../../../../assets/components/sidebar/construction.svg?react'
import DocumentsSvg from '../../../../assets/components/sidebar/document.svg?react'
import SettingsSvg from '../../../../assets/components/sidebar/settings.svg?react'
import { UrlRoutes } from '../../../../services/routes/url-routes'
import { useGetMeQuery } from '../../../../services/api/user'


const ReceptionistRoutes = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { data: me } = useGetMeQuery()

    if (!me) return null

    const activePage =
        location.pathname === UrlRoutes.ReceptionistDocuments ? 'Documents' :
        location.pathname === UrlRoutes.ReceptionistCars ? 'Cars' :
        location.pathname === UrlRoutes.ReceptionistSettings ? 'Setings' :
        undefined

    return (
        <nav className={styles.navigation}>
            <div 
                className={`${styles.element} ${activePage === 'Documents' ? styles.active : ''}`}
                onClick={() => navigate(UrlRoutes.ReceptionistDocuments)}
            >
                <DocumentsSvg className={styles.svg} />
            </div>
            <div 
                className={`${styles.element} ${activePage === 'Cars' ? styles.active : ''}`}
                onClick={() => navigate(UrlRoutes.ReceptionistCars)}
            >
                <ConstructionSvg className={styles.svg} />
            </div>
            <div
                className={`${styles.element} ${activePage === 'Setings' ? styles.active : ''}`}
                onClick={() => navigate(UrlRoutes.ReceptionistSettings)}
            >
                <SettingsSvg className={styles.svg} />
            </div>
        </nav>
    )
}

export default ReceptionistRoutes