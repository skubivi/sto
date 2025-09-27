import { Outlet } from 'react-router-dom'
import styles from './style.module.scss'
import Sidebar from '../sidebar/sidebar'

const Template = () => {
    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Template