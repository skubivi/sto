import ColStripe from '../../../../../../../components/ui/col-stripe/col-stripe'
import Typography from '../../../../../../../components/ui/typography/typography'

import styles from './style.module.scss'

const TableHeader = () => {
    return (
        <div className={styles['title-row']}>
            <div className={styles['filial']}>
                <Typography variant='subtitle' color='white'>Станция</Typography>
            </div>
            <ColStripe />
            <div className={styles['cars-count']}>
                <Typography variant='subtitle' color='white'>Машин принято</Typography>
            </div>
            <ColStripe />
            <div className={styles['cars-processed']}>
                <Typography variant='subtitle' color='white'>Машин осмотрено</Typography>
            </div>
            <ColStripe />
            <div className={styles['processed-percent']}>
                <Typography variant='subtitle' color='white'>% осмотров</Typography>
            </div>
            <ColStripe />
            <div className={styles['cars-given-away']}>
                <Typography variant='subtitle' color='white'>Машин отдано</Typography>
            </div>
            <ColStripe />
            <div className={styles['reports-given-away']}>
                <Typography variant='subtitle' color='white'>Отправлено осмотров по готовым машинам</Typography>
            </div>
            <ColStripe />
            <div className={styles['reports-percent']}>
                <Typography variant='subtitle' color='white'>% отчетов от отданых</Typography>
            </div>
        </div>
    )
}

export default TableHeader