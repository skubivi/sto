import styles from './style.module.scss'

import logo from '../../assets/logo-mini.png'
import { Outlet } from 'react-router-dom'
import { useGetFilialsQuery } from '../../services/api/filial'
import { useEffect, useState } from 'react'
import { getFilialFromLocalStorage, setFilialToLocalStorage } from '../../services/utils/helper-functions/filial'

import BurgerSvg from '../../assets/pages/mechanic-page/burger.svg?react'
import Sidebar from './components/sidebar/sidebar'
import Loader from '../../components/ui/loader/loader'

const MechanicPage = () => {
    const filial = getFilialFromLocalStorage()
    const { data: filials, isSuccess } = useGetFilialsQuery()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (filial === null) {
            if (filials && filials.data.length > 0) setFilialToLocalStorage(filials.data[0].id)
        }

        if (isSuccess) setIsLoading(false)
    }, [isSuccess])
    const [openSideBar, setOpenSideBar] = useState(false)

    if (isLoading || filial === null) return (
        <div className={styles['loader-wrapper']}>
            <div className={styles.loader}>
                <Loader />
            </div>
        </div>
    )

    return (
        <div className={`${styles.wrapper} ${openSideBar && styles.max}`}>
            <div className={styles.header}>
                <div onClick={() => setOpenSideBar(prev => !prev)}>
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