import styles from './style.module.scss'

import logo from '../../assets/logo-mini.png'
import { Outlet } from 'react-router-dom'
import { useGetMyFilialQuery } from '../../services/api/filial'
import { useEffect, useState } from 'react'
import { setFilialToLocalStorage } from '../../services/utils/helper-functions/filial'

import BurgerSvg from '../../assets/pages/mechanic-page/burger.svg?react'
import Sidebar from './components/sidebar/sidebar'

const MechanicPage = () => {
    const { data: filial, isSuccess } = useGetMyFilialQuery()
    useEffect(() => {
        if (filial) setFilialToLocalStorage(filial.id)
    }, [isSuccess])
    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.burger} onClick={() => setOpenSideBar(prev => !prev)}>
                    <BurgerSvg />
                </div>
                <img src={logo} />
            </div>
            <Sidebar open={openSideBar} onClose={() => setOpenSideBar(false)}/>
            <Outlet />
        </div>
    )
}

export default MechanicPage