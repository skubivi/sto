import { FC, ReactNode } from "react"
import styles from './style.module.scss'

interface ISection {
    children?: ReactNode
}

const Section: FC<ISection> = (props) => {
    return (
        <div className={styles.section}>
            {props.children}
        </div>
    )
}

export default Section