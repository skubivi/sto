import { FC, useState } from "react"

import styles from './style.module.scss'
import Camera from "../../../../components/camera/camera"
import StyledModal from "../../../../components/ui/styled-modal/styled-modal"
import Typography from "../../../../components/ui/typography/typography"
import Stripe from "../../../../components/ui/stripe/stripe"
import DefaultButton from "../../../../components/ui/default-button/default-button"

import BackSvg from '../../../../assets/pages/mechanic-main-page/arrow_back_ios.svg?react'

interface IDiagnosticWindow {
    open: boolean
    cardId: string | undefined
    onClose: () => void
    onSubmit: (d: {text: string, photo: Blob | undefined}[]) => void
}

const DiagnosticWindow: FC<IDiagnosticWindow> = (props) => {
    const [data, setData] = useState<{text: string, photo: Blob | undefined}[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [photo, setPhoto] = useState<Blob | undefined>(undefined)
    const [openCamera, setOpenCamera] = useState(false)

    const handleClose = () => {
        if (data.length === 0 && inputValue === '' && photo === undefined) {
            setData([])
            setPhoto(undefined)
            setInputValue('')
            props.onClose()
        }
        else setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
        setData([])
        setPhoto(undefined)
        setInputValue('')
        props.onClose()
    }

    const handleSave = () => {
        setData(prev => [...prev, {text: inputValue, photo}])
        setInputValue('')
        setPhoto(undefined)
    }

    const handleSubmit = async () => {
        if (inputValue)
            props.onSubmit([...data, {
                text: inputValue,
                photo
            }])
        else props.onSubmit(data)
    }

    return (
        <div className={`${styles.wrapper} ${props.open && styles.open}`}>
            {openCamera && <Camera open={openCamera} onClose={() => setOpenCamera(false)} onUpload={setPhoto} />}
            {openModal &&
                <StyledModal open={openModal} onClose={() => setOpenModal(false)}>
                    <div className={styles.modal}>
                        <Typography variant="h2" color="white">Предупреждение</Typography>
                        <Stripe />
                        <div className={styles['modal-info']}>
                            <Typography variant="h4" color="secondary">При выходе данные отчета не сохранятся, вы уверены что хотите покинуть страницу?</Typography>
                        </div>
                        <div className={styles['modal-buttons']}>
                            <DefaultButton variant="outline-danger" onClick={handleModalClose}>Выйти</DefaultButton>
                            <DefaultButton variant="outline-secondary3" onClick={() => setOpenModal(false)}>Отмена</DefaultButton>
                        </div>
                    </div>
                </StyledModal>
            }
            <div className={styles.title}>
                <div onClick={handleClose}>
                    <BackSvg />
                </div>
                <Typography variant="h2" color="white">Создание отчета</Typography>
            </div>
            <div className={styles.main}>
                <div className={styles.button}>
                    <DefaultButton variant="primary" onClick={() => setOpenCamera(true)}>{photo ? 'Изменить фото' : 'Добавить фото'}</DefaultButton>
                </div>
                <div className={styles.button}>
                    <DefaultButton variant="secondary" onClick={handleSave}>Продолжить</DefaultButton>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.button}>
                    <DefaultButton variant="outline-primary" onClick={handleSubmit}>Сформировать отчет</DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default DiagnosticWindow