import PersonalSection from './components/personal-section/personal-section'
import styles from './style.module.scss'

const AdminPersonalPage = () => {
    return (
        <div className={styles.personal}>
            <PersonalSection />
        </div>
    )
}

export default AdminPersonalPage