import ColStripe from '../../../../../../../components/ui/col-stripe/col-stripe'
import Typography from '../../../../../../../components/ui/typography/typography'
import { useGetMeQuery } from '../../../../../../../services/api/user'
import { ERoles } from '../../../../../../../services/types/user'
import styles from './style.module.scss'

const TableHeader = () => {

    const { data: me } = useGetMeQuery()

    return (
        <div className={styles['title-row']}>
            {me?.role === ERoles.FullAdmin && 
                <>
                    <div className={styles['filial']}>
                        <Typography variant='subtitle' color='white'>Станция</Typography>
                    </div>
                    <ColStripe />
                </>
            }
            <div className={styles['mechanic']}>
                <Typography variant='subtitle' color='white'>Механик</Typography>
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