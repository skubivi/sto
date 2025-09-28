import styles from './style.module.scss'

import Typography from '../typography/typography'
import StyledSelect from '../styled-select/styled-select'

function StyledSelectWithLabel<T>(
    props: {
        active: T, 
        options: {id: T, title: string}[],
        onChange: (id: T) => void
        label: string
    }
) {
    if (props.options.length === 0) return null

    return (
        <div className={styles.select}>
            <Typography variant='caption' color='secondary'>{props.label}</Typography>
            <StyledSelect {...props}/>
        </div>
    )
}

export default StyledSelectWithLabel