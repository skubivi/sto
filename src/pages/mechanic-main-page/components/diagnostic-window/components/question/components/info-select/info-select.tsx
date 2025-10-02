import { FC } from 'react'
import { TMetallworkerQuestion } from '../../../../../../../../services/utils/constants/diagnostic-data'
import styles from './style.module.scss'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'
import Typography from '../../../../../../../../components/ui/typography/typography'

interface IInfoSelect {
    data: TMetallworkerQuestion
    onClick: (ids: number[]) => void
    onNextQuestion: () => void
}

const InfoSelect: FC<IInfoSelect> = (props) => {
    const handleClick = (option: string) => {
        const skip = props.data.skipLogic?.find(el => el.option === option)
        if (skip) props.onClick(skip.skipId)
        else props.onNextQuestion()
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

export default InfoSelect