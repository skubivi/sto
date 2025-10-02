import { FC, useState } from "react"

import styles from './style.module.scss'
import DefaultButton from "../../../../../../components/ui/default-button/default-button"
import Typography from "../../../../../../components/ui/typography/typography"
import { EQuestionType, TMetallworkerQuestion } from "../../../../../../services/utils/constants/diagnostic-data"
import Camera from "../../../../../../components/camera/camera"
import Select from "./components/select/select"
import InfoSelect from "./components/info-select/info-select"
import Input from "./components/input/input"
import Final from "./components/final/final"
import Choise from "./components/choise/choise"
import MultiSelect from "./components/multi-select/multi-select"

interface IQuestion {
    onDefect: (id: number, text: string, title: string, subtitle: string, photo: Blob | undefined) => void
    onNorm: () => void
    question: TMetallworkerQuestion
    onAddSkip: (ids: number[]) => void
    id: number
}

const Question: FC<IQuestion> = (props) => {
    const [openCamera, setOpenCamera] = useState(false)
    const [photo, setPhoto] = useState<Blob | undefined>(undefined)
    const [text, setText] = useState('')
    const [isDefect, setIsDefect] = useState(false)

    const handleDefect = () => {
        if (text.length > 0) {
            props.onDefect(props.id, text, props.question.docTitle, '', photo)
            setText('')
            setIsDefect(false)
            setPhoto(undefined)
        }
    }

    const handleNorm = () => {
        setText('')
        setIsDefect(false)
        setPhoto(undefined)
        props.onNorm()
    }

    const handleAddSkip = (ids: number[]) => {
        props.onAddSkip(ids)
        handleNorm()
    }

    const handleInput = (s: string) => {
        if (s.length > 0) {
            props.onDefect(props.id, s, props.question.docTitle, '', photo)
            setText('')
            setIsDefect(false)
            setPhoto(undefined)
        }
    }

    const handleFinal = (s: string) => {
        if (s.length > 0) {
            props.onDefect(props.id, s, props.question.docTitle, '', photo)
        }
        else props.onNorm()
    }

    const handleChoise = (ids: number[], text: string, isDefect: boolean) => {
        props.onAddSkip(ids)
        if (isDefect) handleInput(text)
        else handleNorm()
    }

    if (props.question.type === EQuestionType.InfoSelect) return (
        <div className={styles.container}>
            <InfoSelect data={props.question} onClick={handleAddSkip} onNextQuestion={handleNorm} />
        </div>
    )

    if (props.question.type === EQuestionType.Final) return (
        <div className={styles.container}>
            <Final data={props.question} onInput={handleFinal} />
        </div>
    )

    if (props.question.type === EQuestionType.Choise) return (
        <div className={styles.container}>
            <Choise data={props.question} onDefect={handleChoise} />
        </div>
    )

    return (
        <div className={styles.container}>
            {openCamera && <Camera open={openCamera} onClose={() => setOpenCamera(false)} onUpload={setPhoto} />}
            <Typography variant="h3" color="secondary">{props.question.title}</Typography>
            <div className={styles.buttons}>
                {!isDefect &&
                    <>
                        <div className={styles.button}>
                            <DefaultButton variant="primary" onClick={props.onNorm}>{props.question.ok ?? 'Норма'}</DefaultButton>
                        </div>
                        <div className={styles.button}>
                            <DefaultButton variant="secondary" onClick={() => setIsDefect(true)}>{props.question.fault ?? 'Дефект'}</DefaultButton>
                        </div>
                    </>
                }
                {(isDefect) &&
                    <div className={styles.button}>
                        <DefaultButton variant="primary" onClick={() => setOpenCamera(true)}>{photo ? 'Изменить фото' : 'Добавить фото'}</DefaultButton>
                    </div>
                }
                {isDefect && props.question.type === EQuestionType.Select &&
                    <Select data={props.question} onSelect={(s) => setText(s)} text={text} />
                }
                {isDefect && props.question.type === EQuestionType.Input &&
                    <Input data={props.question} onInput={handleInput} photo={photo} />
                }
                {isDefect && props.question.type === EQuestionType.MultiSelect &&
                    <MultiSelect data={props.question} onSelect={handleInput} photo={photo}/>
                }
                
                {isDefect && props.question.type === EQuestionType.Select && text.length > 0 &&
                    <div className={styles.button}>
                        <DefaultButton variant="secondary" onClick={handleDefect}>Продолжить</DefaultButton>
                    </div>
                }
            </div>
        </div>
    )
}

export default Question