import ColStripe from '../../../../../../../../components/ui/col-stripe/col-stripe'
import Typography from '../../../../../../../../components/ui/typography/typography'

import styles from './style.module.scss'

const TableHeader = () => {
    return (
        <div className={styles['title-row']}>
            <div className={styles['title']}>
                <Typography variant='subtitle' color='white'>ФИО</Typography>
            </div>
            <ColStripe />
            <div className={styles['created-at']}>
                <Typography variant='subtitle' color='white'>Дата регистрации</Typography>
            </div>
            <ColStripe />
            <div className={styles['actions']}>
                <Typography variant='subtitle' color='white'>Действия</Typography>
            </div>
        </div>
    )
}

export default TableHeader