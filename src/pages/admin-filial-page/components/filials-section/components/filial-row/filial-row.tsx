import { FC, useState } from "react"
import ColStripe from "../../../../../../components/ui/col-stripe/col-stripe"
import Typography from "../../../../../../components/ui/typography/typography"

import DeleteSvg from '../../../../../../assets/pages/admin-filial-page/backspace.svg?react'
import EditSvg from '../../../../../../assets/pages/admin-filial-page/edit.svg?react'

import styles from './style.module.scss'
import { usePatchFilialMutation } from "../../../../../../services/api/filial"
import TitleInput from "./components/title-input/title-input"

interface IFilialRow {
    title: string
    id: string
    openDeleteModal: () => void
}

const FilialRow: FC<IFilialRow> = ({title, id, openDeleteModal}) => {
    const [isChangingName, setIsChangingName] = useState(false)

    const [changeName] = usePatchFilialMutation()

    const handleChangeName = (s: string) => {
        if (s !== title)
            changeName({id, title: s})
        setTimeout(() => {
            setIsChangingName(false)
        }, 100)
    }
    const handleCloseInput = () => {
        setIsChangingName(false)
    }
    const handleOpenInput = () => {
        setIsChangingName(true)
    }

    return (
        <div className={styles['filial-row']}>
            <div className={styles['title']}>
                {
                    isChangingName 
                    ? <TitleInput value={title} onSubmit={handleChangeName} onClose={handleCloseInput}/>
                    : <Typography variant='subtitle' color='secondary'>{title}</Typography>
                }
            </div>
            <div className={styles['col']}>
                <ColStripe />
            </div>
            <div className={styles['actions']}>
                <div 
                    className={`${styles['icon']} ${isChangingName && styles['active']}`}
                    onClick={handleOpenInput}
                >
                    <EditSvg />
                </div>
                <div className={styles['icon']} onClick={openDeleteModal}>
                    <DeleteSvg />
                </div>
            </div>
        </div>
    )
}

export default FilialRow