import { FC, useState } from 'react'
import { TMetallworkerQuestion } from '../../../../../../../../services/utils/constants/diagnostic-data'
import styles from './style.module.scss'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'
import DefaultInput from '../../../../../../../../components/ui/default-input/default-input'
import Typography from '../../../../../../../../components/ui/typography/typography'

interface IFinal {
    data: TMetallworkerQuestion
    onInput: (s: string) => void
}

const Final: FC<IFinal> = (props) => {
    const [value, setValue] = useState('')
    return (
        <div className={styles.wrapper}>
            <Typography variant="h3" color="secondary">{props.data.title}</Typography>
            <DefaultInput value={value} onChange={(e) => setValue(e.target.value)} />
            <DefaultButton variant='primary' onClick={() => props.onInput(value)}>Продолжить</DefaultButton>
        </div>
    )
}

export default Final