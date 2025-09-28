import { useGetMeQuery } from '../../services/api/user'
import { ERoles } from '../../services/types/user'
import MechanicFilialSection from './mechanic-filial-section/mechanic-filial.section'
import MechanicsSection from './mechanics-section/mechanics-section'
import ReceptionistFilialSection from './receptionist-filial-section/receptionist-filial-section'
import ReceptionistSection from './recetionist-section/receptionist-section'
import styles from './style.module.scss'

const AdminAnalyticsPage = () => {
    const { data: me } = useGetMeQuery()

    return (
        <div className={styles.analytics}>
            <ReceptionistSection />
            <MechanicsSection />
            {me?.role === ERoles.FullAdmin &&
                <>
                    <ReceptionistFilialSection />
                    <MechanicFilialSection />
                </>
            }
        </div>
    )
}

export default AdminAnalyticsPage