import { FC, useState } from "react"
import styles from './style.module.scss'
import InputWithLabel from "../input-with-label/input-with-label"

import VisibilityOnSvg from '../../../assets/visibility-on.svg?react'
import VisibilityOffSvg from '../../../assets/visibility-off.svg?react'
import { TDefaultInputProps } from "../default-input/default-input"

type TPasswordInput = {
    label: string
} & TDefaultInputProps

const PasswordInput: FC<TPasswordInput> = (props) => {
    const [visible, setVisible] = useState(false)
    const type = visible ? 'text' : 'password'
    return (
        <div className={styles.container}>
            <InputWithLabel {...props} type={type}/>
            <div 
                className={styles.visibility}
                onClick={() => {
                    setVisible(prev => !prev)
                }}
            >
                {
                    visible
                        ? <VisibilityOnSvg />
                        : <VisibilityOffSvg />
                }
            </div>
        </div>
    )
}

export default PasswordInput