import { FC, useState } from "react"

import styles from './style.module.scss'
import Camera from "../../../../components/camera/camera"
import StyledModal from "../../../../components/ui/styled-modal/styled-modal"
import Typography from "../../../../components/ui/typography/typography"
import Stripe from "../../../../components/ui/stripe/stripe"
import DefaultButton from "../../../../components/ui/default-button/default-button"

import BackSvg from '../../../../assets/pages/mechanic-main-page/arrow_back_ios.svg?react'
import Question from "./components/question/question"
import { ELECTRO_QUESTIONS } from "../../../../services/utils/constants/electro-diagnostic-data"

interface IElectroWindow {
    open: boolean
    cardId: string | undefined
    onClose: () => void
    onSubmit: (d: {title: string, subtitle: string, text: string, photo: Blob | undefined}[]) => void
    isUploadingDocument: boolean
}

const ElectroWindow: FC<IElectroWindow> = (props) => {
    const [data, setData] = useState<{title: string, subtitle: string, text: string, photo: Blob | undefined}[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [photo, setPhoto] = useState<Blob | undefined>(undefined)
    const [openCamera, setOpenCamera] = useState(false)
    const [question, setQuestion] = useState<{row: number, number: number}>({row: 0, number: 0})
    const [isFinal, setIsFinal] = useState(false)

    const handleClose = () => {
        if (data.length === 0 && photo === undefined) {
            setData([])
            setPhoto(undefined)
            setIsFinal(false)
            setQuestion({row: 0, number: 0})
            props.onClose()
        }
        else setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
        setData([])
        setPhoto(undefined)
        setIsFinal(false)
        setQuestion({row: 0, number: 0})
        props.onClose()
    }

    const handleSubmit = async () => {
        if (isFinal) props.onSubmit(data)
    }

    const handleNextQuestion = () => {
        setQuestion(prev => {
            if (ELECTRO_QUESTIONS.length <= prev.row + 1 && ELECTRO_QUESTIONS[prev.row].questions.length <= prev.number + 1) {
                setIsFinal(true)
                return {
                    row: 0,
                    number: 0
                }
            }
            else if (ELECTRO_QUESTIONS[prev.row].questions.length <= prev.number + 1)
                return {
                    row: prev.row + 1,
                    number: 0
                }
            return {
                row: prev.row,
                number: prev.number + 1
            }
        })

        setPhoto(undefined)
    }

    const handleOnDefect = (text: string) => {
        const title = ELECTRO_QUESTIONS[question.row].title
        const subtitle = ELECTRO_QUESTIONS[question.row].questions[question.number]
        
        setData(prev => [...prev, {
            title,
            subtitle,
            text,
            photo
        }])

        handleNextQuestion()
    }

    const handleBack = () => {
        if (question.row === 0 && question.number === 0) return null
        setQuestion(prev => {
            if (prev.number === 0) return {
                row: prev.row - 1,
                number: ELECTRO_QUESTIONS[prev.row - 1].questions.length - 1
            }
            return {
                row: prev.row,
                number: prev.number - 1
            }
        })
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
                {!isFinal &&
                    <Question 
                        onNorm={handleNextQuestion}
                        openCamera={() => setOpenCamera(true)}
                        onDefect={handleOnDefect}
                        photo={photo !== undefined}
                        title={ELECTRO_QUESTIONS[question.row].title}
                        subtitle={ELECTRO_QUESTIONS[question.row].questions[question.number]}
                        isInput={ELECTRO_QUESTIONS[question.row].type === 'INPUT'}
                    />
                }
            </div>
            <div className={styles.bottom}>
                {!(question.number === 0 && question.row === 0) &&
                    <div className={styles.button}>
                        <DefaultButton variant="outline-secondary3" onClick={handleBack}>Предыдущий вопрос</DefaultButton>
                    </div>
                }
                {isFinal &&
                    <div className={styles.button}>
                        <DefaultButton variant="outline-primary" onClick={handleSubmit} disabled={props.isUploadingDocument}>Сформировать отчет</DefaultButton>
                    </div>
                }
            </div>
        </div>
    )
}

export default ElectroWindow