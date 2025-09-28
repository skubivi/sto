import styles from './style.module.scss'

import Typography from '../typography/typography'
import StyledMultiSelect from '../styled-multi-select/styled-multi-select'

function StyledMultiSelectWithLabel<T>(
    props: {
        active: {id: T, title: string}[], 
        options: {id: T, title: string}[],
        onAdd: (id: T) => void
        onRemove: (id: T) => void
        label: string
    }
) {
    if (props.options.length === 0) return null

    return (
        <div className={styles.select}>
            <Typography variant='caption' color='secondary'>{props.label}</Typography>
            <StyledMultiSelect active={props.active} options={props.options} onAdd={props.onAdd} onRemove={props.onRemove}/>
        </div>
    )
}

export default StyledMultiSelectWithLabel