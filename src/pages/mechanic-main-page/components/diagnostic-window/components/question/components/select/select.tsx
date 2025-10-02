import { FC } from 'react'
import { TMetallworkerQuestion } from '../../../../../../../../services/utils/constants/diagnostic-data'
import styles from './style.module.scss'
import Typography from '../../../../../../../../components/ui/typography/typography'

interface ISelect {
    data: TMetallworkerQuestion
    onSelect: (s: string) => void
    text: string
}

const Select: FC<ISelect> = (props) => {
    
    return (
        <div className={styles.wrapper}>
            <Typography variant='h4' color='white'>Выберите одно</Typography>
            <div className={styles.buttons}>
                {props.data.defectOptions?.map((el, index) => (
                    <div onClick={() => props.onSelect(el)} key={index} className={styles.element}>
                        <div className={`${styles.checkbox} ${props.text === el && styles.active}`}/>
                        <Typography variant='subtitle' color='secondary'>{el}</Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Select