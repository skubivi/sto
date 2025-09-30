import { FC, useState } from "react"
import Typography from "../../../../../components/ui/typography/typography"

import styles from './style.module.scss'

interface IRoute {
    label: string
    onClick: () => void
}

const Route: FC<IRoute> = (props) => {
    const [active, setActive] = useState(false)
    const handleClick = () => {
        setActive(true)
        props.onClick()
        setTimeout(() => {
            setActive(false)
        }, 500)
    }
    return (
        <div onClick={handleClick} className={`${styles.container} ${active && styles.active}`}>
            <Typography variant="h2" color="white">{props.label}</Typography>
        </div>
    )
}

export default Route