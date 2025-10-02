import { FC, useState } from "react"

import styles from './style.module.scss'
import StyledModal from "../../../../components/ui/styled-modal/styled-modal"
import Typography from "../../../../components/ui/typography/typography"
import Stripe from "../../../../components/ui/stripe/stripe"
import DefaultButton from "../../../../components/ui/default-button/default-button"

import BackSvg from '../../../../assets/pages/mechanic-main-page/arrow_back_ios.svg?react'
import { METALWORKER_QUESTIONS } from "../../../../services/utils/constants/diagnostic-data"
import Question from "./components/question/question"

interface IDiagnosticWindow {
    open: boolean
    cardId: string | undefined
    onClose: () => void
    onSubmit: (d: {title: string, subtitle: string, text: string, photo: Blob | undefined}[]) => void
}

const DiagnosticWindow: FC<IDiagnosticWindow> = (props) => {
    const [data, setData] = useState<{title: string, subtitle: string, text: string, photo: Blob | undefined}[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [photo, setPhoto] = useState<Blob | undefined>(undefined)
    const [question, setQuestion] = useState(0)
    const [skip, setSkip] = useState<number[]>([])
    const [isFinal, setIsFinal] = useState(false)

    const handleClose = () => {
        if (data.length === 0 && photo === undefined) {
            setData([])
            setPhoto(undefined)
            setIsFinal(false)
            setQuestion(0)
            props.onClose()
        }
        else setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
        setData([])
        setPhoto(undefined)
        setIsFinal(false)
        setQuestion(0)
        props.onClose()
    }

    const handleSubmit = async () => {
        if (isFinal) props.onSubmit(data)
    }

    const handleNextQuestion = () => {
            setQuestion(prev => {
                for (let i = prev + 1; i < 10; i++) {
                    if (!skip.includes(i)) return i
                }
                setIsFinal(true)
                return 0
            })
        }

    const handleOnDefect = (text: string, title: string, subtitle: string, photo: Blob | undefined) => {
        setData(prev => [...prev, {
            title,
            subtitle,
            text,
            photo
        }])

        handleNextQuestion()
    }

    const handleAddSkip = (ids: number[]) => {
        setSkip(prev => {
            const temp = prev.slice()
            ids.forEach(el => {
                if (!temp.includes(el)) temp.push(el)
            })
            return temp
        })
    }

    return (
        <div className={`${styles.wrapper} ${props.open && styles.open}`}>
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
                {!isFinal && props.open &&
                    <Question 
                        onNorm={handleNextQuestion}
                        onDefect={handleOnDefect}
                        question={METALWORKER_QUESTIONS[question]}
                        onAddSkip={handleAddSkip}
                    />
                }
            </div>
            <div className={styles.bottom}>
                {isFinal &&
                    <div className={styles.button}>
                        <DefaultButton variant="outline-primary" onClick={handleSubmit}>Сформировать отчет</DefaultButton>
                    </div>
                }
            </div>
        </div>
    )
}

export default DiagnosticWindow