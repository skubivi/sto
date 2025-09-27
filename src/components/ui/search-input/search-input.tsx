import { FC } from "react"
import SearchSvg from '../../../assets/components/search-input/search.svg?react'
import styles from './style.module.scss';

export type TDefaultInputProps = {
    ref?: React.Ref<HTMLInputElement>
} & React.InputHTMLAttributes<HTMLInputElement>

const SearchInput: FC<TDefaultInputProps> = ({className, ref, ...props}) => {
    return (
        <div className={styles.container}>
            <input 
                className={`${styles.input} ${className}`}
                autoComplete="new-password"
                ref={ref}
                placeholder="Поиск"
                {...props}
            />
            <div className={styles.icon}>
                <SearchSvg />
            </div>
        </div>
    )
}

export default SearchInput