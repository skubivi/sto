import { FC } from 'react'
import Typography from '../typography/typography'
import styles from './style.module.scss'
import { ESign } from '../../../services/types/analytics'
import DefaultInput from '../default-input/default-input'

interface IInputWithSign {
    value: number | undefined
    sign: ESign
    setValue: (v: number | undefined) => void
    changeSign: () => void
    label: string
    isPercent?: true
}

const InputWithSign: FC<IInputWithSign> = (props) => {
    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value === '' || e.target.value === undefined) return props.setValue(undefined)
        if (Number.isNaN(Number.parseFloat(e.target.value))) return
        props.setValue(Number.parseFloat(e.target.value))
    }
    return (
        <div className={styles.container}>
            <Typography variant='caption' color='secondary3'>{props.label}</Typography>
            <div className={styles['input-container']}>
                <div className={styles.sign} onClick={props.changeSign}>
                    <Typography variant='h3' color='secondary'>
                        {props.sign === ESign.More ? '>' : '<'}
                    </Typography>
                </div>
                <div className={styles['input-relative-container']}>
                    <DefaultInput 
                        value={props.value ?? ''} 
                        onChange={handleOnChange} 
                        className={`${styles.input} ${props.isPercent && styles.padding}`}
                    />
                    {props.isPercent &&
                        <div className={styles.percent}>
                            <Typography variant='subtitle' color='secondary'>%</Typography>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default InputWithSign