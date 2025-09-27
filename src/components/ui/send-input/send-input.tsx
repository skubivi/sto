import { FC } from "react"
import SendSvg from '../../../assets/components/send-input/send.svg?react'

import styles from './style.module.scss';

export type TDefaultInputProps = {
    onSend: () => void
    ref?: React.Ref<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>

const SendInput: FC<TDefaultInputProps> = ({onSend, className, ref, ...props}) => {
    return (
        <div className={styles.container}>
            <input 
                className={`${styles.input} ${className}`}
                autoComplete="new-password"
                ref={ref}
                {...props}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSend()
                    }
                }}
            />
            <div className={styles.icon} onClick={onSend}>
                <SendSvg />
            </div>
        </div>
    )
}

export default SendInput