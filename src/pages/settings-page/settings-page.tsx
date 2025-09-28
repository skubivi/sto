import DefaultButton from "../../components/ui/default-button/default-button"
import { useGetLogoutMutation } from "../../services/api/auth"
import { useGetMeQuery } from "../../services/api/user"
import { ERoles } from "../../services/types/user"
import Filial from "./components/filial/filial"
import Personal from "./components/personal/personal"
import Security from "./components/security/security"

import styles from './style.module.scss'

const SettingsPage = () => {
    const {data: user} = useGetMeQuery()
    const [logout] = useGetLogoutMutation()

    return (
        <div className={styles.settings}>
            <Personal />
            {user?.role !== ERoles.FullAdmin &&
                <Filial />
            }
            <Security />
            <div className={styles.logout}>
                <DefaultButton variant="primary" onClick={() => logout()}>
                    выйти
                </DefaultButton>
            </div>
        </div>
    )
}

export default SettingsPage