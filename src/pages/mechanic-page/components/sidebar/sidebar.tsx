import { FC } from "react"

import CloseSvg from '../../../../assets/pages/mechanic-page/burger.svg?react'
import logo from '../../../../assets/logo.png'

import styles from './style.module.scss'
import { useNavigate } from "react-router-dom"
import Route from "./route/route"
import { UrlRoutes } from "../../../../services/routes/url-routes"
import DefaultButton from "../../../../components/ui/default-button/default-button"

interface ISidebar {
    open: boolean
    onClose: () => void
}

const SideBar: FC<ISidebar> = (props) => {
    const navigate = useNavigate()
    const handleClick = (r: UrlRoutes) => {
        navigate(r)
        props.onClose()
    }
    return (
        <div className={`${styles.sidebar} ${props.open && styles.open}`}>
            <div className={styles.header}>
                <img src={logo} />
                <div onClick={props.onClose} className={styles.close}>
                    <CloseSvg />
                </div>
            </div>
            <div className={styles.routes}>
                <Route label="Главная" onClick={() => handleClick(UrlRoutes.Mechanic)} />
                <Route label="Настройки" onClick={() => handleClick(UrlRoutes.Mechanic)} />
            </div>
            <div className={styles.logout}>
                <div>
                    <DefaultButton variant="primary">Выйти</DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default SideBar