import { FC } from "react"
import Typography from "../typography/typography"
import DefaultInput, { TDefaultInputProps } from "../default-input/default-input"
import styles from './style.module.scss'

type TInputWithLabel = {
    label: string
} & TDefaultInputProps

const InputWithLabel: FC<TInputWithLabel> = (props) => {
    return (
        <div className={styles.container}>
            <Typography variant="caption" color="secondary3">
                {props.label}
            </Typography>
            <DefaultInput {...props}/>
        </div>
    )
}

export default InputWithLabel