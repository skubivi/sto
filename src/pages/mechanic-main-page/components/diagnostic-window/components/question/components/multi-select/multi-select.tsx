import { FC, useState } from 'react'
import { TMetallworkerQuestion } from '../../../../../../../../services/utils/constants/diagnostic-data'
import styles from './style.module.scss'
import Typography from '../../../../../../../../components/ui/typography/typography'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'

interface IMultiSelect {
    data: TMetallworkerQuestion
    onSelect: (s: string) => void
    photo: Blob | undefined
}

const MultiSelect: FC<IMultiSelect> = (props) => {
    const [options, setOptions] = useState<string[]>([])
    const handleSelect = (s: string) => {
        setOptions(prev => {
            const temp = prev.slice()
                if (temp.includes(s)) {
                    const index = temp.findIndex(el => el === s)
                    return [...prev.slice(0, index), ...prev.slice(index + 1)]
                }
                else temp.push(s)
            return temp
        })
    }
    let text = ''
    options.forEach(el => text += (el + ' '))
    return (
        <div className={styles.wrapper}>
            <Typography variant='h4' color='white'>Выберите несколько</Typography>
            <div className={styles.buttons}>
                {props.data.defectOptions?.map((el, index) => (
                    <div onClick={() => handleSelect(el)} key={index} className={styles.element}>
                        <div className={`${styles.checkbox} ${options.some(element => element === el) && styles.active}`}/>
                        <Typography variant='subtitle' color='secondary'>{el}</Typography>
                    </div>
                ))}
            </div>
            {options.length > 0 && props.photo &&
                <DefaultButton variant='primary' onClick={() => props.onSelect(text)}>Продолжить</DefaultButton>
            }
        </div>
    )
}

export default MultiSelect