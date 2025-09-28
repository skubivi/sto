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
            <div className={styles['dianostic-count']}>
                <Typography variant='subtitle' color='white'>Кол-во диагностик</Typography>
            </div>
            <ColStripe />
            <div className={styles['works-count']}>
                <Typography variant='subtitle' color='white'>Выявлено работ (шт.)</Typography>
            </div>
            <ColStripe />
            <div className={styles['average-diangostic']}>
                <Typography variant='subtitle' color='white'>Среднее за диагностику</Typography>
            </div>
            <ColStripe />
            <div className={styles['reports-count']}>
                <Typography variant='subtitle' color='white'>Отчетов по готовым работам</Typography>
            </div>
        </div>
    )
}

export default TableHeader