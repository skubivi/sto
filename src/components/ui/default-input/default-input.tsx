import { FC } from "react"
import styles from './style.module.scss';

export type TDefaultInputProps = {
    ref?: React.Ref<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>

const DefaultInput: FC<TDefaultInputProps> = ({className, ref, ...props}) => {
    return (
        <div className={styles.container}>
            <input 
                className={`${styles.input} ${className}`}
                autoComplete="new-password"
                ref={ref}
                {...props}
            />
        </div>
    )
}

export default DefaultInput