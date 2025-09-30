import { FC, ReactNode } from "react"
import styles from './style.module.scss'

interface ITypography {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-small' | 'subtitle' | 'caption' | 'button-text' | 'note-caption',
    children: ReactNode
    color: 'primary' | 'primary2' | 'white' | 'black' | 'secondary' | 'secondary2' | 'secondary3' | 'danger',
    id?: string
    underline?: boolean
}

const Typography: FC<ITypography> = ({variant, children, color, id, underline}) => {
    if (variant === 'h1')
        return (<h1 className={`${styles[color]} ${underline && styles.underline}`} id={id}>{children}</h1>)
    if (variant === 'h2')
        return (<h2 className={`${styles[color]} ${underline && styles.underline}`} id={id}>{children}</h2>)
    if (variant === 'h3')
        return (<h3 className={`${styles[color]} ${underline && styles.underline}`} id={id}>{children}</h3>)
    if (variant === 'h4')
        return (<h4 className={`${styles[color]} ${underline && styles.underline}`} id={id}>{children}</h4>)

    return (
        <p className={`${styles[variant]} ${styles[color]} ${underline && styles.underline}`} id={id}>{children}</p>
    )
}

export default Typography