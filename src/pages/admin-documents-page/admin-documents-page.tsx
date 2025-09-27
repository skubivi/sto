import AnalyticsSection from './components/analytics-section/analytics-section'
import DiagnosticSection from './components/dianostic-section/diagnostic-section'
import ReportsSection from './components/reports-section/reports-section'
import WaitToApproveSection from './components/wait-to-approve-section/wait-to-approve-section'
import styles from './style.module.scss'

const AdminDocumentsPage = () => {
    return (
        <div className={styles.documents}>
            <WaitToApproveSection />
            <AnalyticsSection />
            <DiagnosticSection />
            <ReportsSection />
        </div>
    )
}

export default AdminDocumentsPage