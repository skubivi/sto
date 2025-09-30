import { FC, useState } from "react"

import styles from './style.module.scss'
import DefaultButton from "../../../../../../components/ui/default-button/default-button"
import DefaultInput from "../../../../../../components/ui/default-input/default-input"
import Typography from "../../../../../../components/ui/typography/typography"

interface IQuestion {
    title: string
    subtitle: string
    onDefect: (text: string) => void
    onNorm: () => void
    photo: boolean
    openCamera: () => void
    isInput: boolean
}

const Question: FC<IQuestion> = (props) => {
    const [isDefect, setDefect] = useState(false)
    const [input, setInput] = useState('')

    const handleDefect = () => {
        if ((props.photo || props.isInput) && input.length > 0) {
            props.onDefect(input)
            setInput('')
            setDefect(false)
        }
    }

    return (
        <div className={styles.container}>
            <Typography variant="h3" color="secondary">{props.title}</Typography>
            <Typography variant="h4" color="secondary">{props.subtitle}</Typography>
            <div className={styles.buttons}>
                {!isDefect && !props.isInput &&
                    <>
                        <div className={styles.button}>
                            <DefaultButton variant="primary" onClick={props.onNorm}>Норма</DefaultButton>
                        </div>
                        <div className={styles.button}>
                            <DefaultButton variant="secondary" onClick={() => setDefect(true)}>Дефект</DefaultButton>
                        </div>
                    </>
                }
                {(isDefect || props.isInput) &&
                    <>
                        <div className={styles.button}>
                            <DefaultInput value={input} onChange={(e) => setInput(e.target.value)} />
                        </div>
                        {!props.isInput &&
                            <div className={styles.button}>
                                <DefaultButton variant="primary" onClick={props.openCamera}>{props.photo ? 'Изменить фото' : 'Добавить фото'}</DefaultButton>
                            </div>
                        }
                        {(props.photo || props.isInput) && input.length > 0 &&
                            <div className={styles.button}>
                                <DefaultButton variant="secondary" onClick={handleDefect}>Продолжить</DefaultButton>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Question