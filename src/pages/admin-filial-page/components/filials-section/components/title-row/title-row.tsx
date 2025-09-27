import ColStripe from "../../../../../../components/ui/col-stripe/col-stripe"
import Typography from "../../../../../../components/ui/typography/typography"

import styles from './style.module.scss'

const TitleRow = () => {
    return (
        <div className={styles['title-row']}>
            <div className={styles['title']}>
                <Typography variant='subtitle' color='white'>Название</Typography>
            </div>
            <ColStripe />
            <div className={styles['actions']}>
                <Typography variant='subtitle' color='white'>Действия</Typography>
            </div>
        </div>
    )
}

export default TitleRow