import { FC, ReactNode } from "react"
import styles from './style.module.scss'

interface IDefaultButton {
    children: ReactNode
    variant: 'primary' | 'outline-primary' | 'outline-danger' | 'outline-secondary3'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

const DefaultButton: FC<IDefaultButton> = (props) => {
    return (
        <button className={`${styles.button} ${styles[props.variant]} ${props.disabled === true && styles.disabled}`} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default DefaultButton