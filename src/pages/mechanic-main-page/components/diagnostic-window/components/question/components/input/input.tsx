import { FC, useState } from 'react'
import { TMetallworkerQuestion } from '../../../../../../../../services/utils/constants/diagnostic-data'
import styles from './style.module.scss'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'
import DefaultInput from '../../../../../../../../components/ui/default-input/default-input'

interface IInput {
    data: TMetallworkerQuestion
    onInput: (s: string) => void
    photo: Blob | undefined
}

const Input: FC<IInput> = (props) => {
    const [value, setValue] = useState('')
    return (
        <div className={styles.wrapper}>
            <DefaultInput value={value} onChange={(e) => setValue(e.target.value)} placeholder={props.data.input}/>
            {value.length > 0 &&
                <DefaultButton variant='primary' onClick={() => props.onInput(value)}>Продолжить</DefaultButton>
            }
        </div>
    )
}

export default Input