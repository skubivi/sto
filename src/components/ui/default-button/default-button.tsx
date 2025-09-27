import { FC, ReactNode } from "react"
import styles from './style.module.scss'

interface IDefaultButton {
    children: ReactNode
    variant: 'primary' | 'outline-primary' | 'outline-danger' | 'outline-secondary3'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const DefaultButton: FC<IDefaultButton> = (props) => {
    return (
        <button className={`${styles.button} ${styles[props.variant]}`} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default DefaultButton