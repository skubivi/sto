import { FC } from 'react'
import { TMetallworkerQuestion } from '../../../../../../../../services/utils/constants/diagnostic-data'
import styles from './style.module.scss'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'
import Typography from '../../../../../../../../components/ui/typography/typography'

interface IChoise {
    data: TMetallworkerQuestion
    onDefect: (ids: number[], text: string, isDefect: boolean) => void
}

const Choise: FC<IChoise> = (props) => {
    const handleReturnIds = (option: string) => {
        const skip = props.data.skipLogic?.find(el => el.option === option)
        if (skip) return skip.skipId
        return []
    }
    const handleIsDefect = (option: string) => {
        const defectIndex = props.data.defectOptions?.findIndex(el => el === option)
        return (defectIndex !== -1)
    }
    const handleClick = (option: string) => {
        const ids = handleReturnIds(option)
        const isDefect = handleIsDefect(option)
        props.onDefect(ids, option, isDefect)
    }
    return (
        <div className={styles.wrapper}>
            <Typography variant="h3" color="secondary">{props.data.title}</Typography>
            <div className={styles.buttons}>
                {props.data.options?.map((el, index) => (
                    <DefaultButton variant='primary' key={index} onClick={() => handleClick(el)}>{el}</DefaultButton>
                ))}
            </div>
        </div>
    )
}

export default Choise