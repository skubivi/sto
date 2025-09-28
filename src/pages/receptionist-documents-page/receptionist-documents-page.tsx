import WaitToApproveSection from './components/wait-to-approve-section/wait-to-approve-section'
import styles from './style.module.scss'

const ReceptionistDocumentPage = () => {
    return (
        <div className={styles.documents}>
            <WaitToApproveSection />
        </div>
    )
}

export default ReceptionistDocumentPage