import ColStripe from '../../../../../../../../components/ui/col-stripe/col-stripe'
import Typography from '../../../../../../../../components/ui/typography/typography'
import { useGetMeQuery } from '../../../../../../../../services/api/user'
import { ERoles } from '../../../../../../../../services/types/user'

import styles from './style.module.scss'

const TableHeader = () => {
    const { data: me } = useGetMeQuery()
    return (
        <div className={styles['title-row']}>
            <div className={styles['title']}>
                <Typography variant='subtitle' color='white'>Название</Typography>
            </div>
            {me?.role === ERoles.FullAdmin &&
                <>
                    <ColStripe />
                    <div className={styles['filial']}>
                        <Typography variant='subtitle' color='white'>Филиал</Typography>
                    </div>
                </>
            }
            <ColStripe />
            <div className={styles['mechanic']}>
                <Typography variant='subtitle' color='white'>Механик</Typography>
            </div>
            <ColStripe />
            <div className={styles['client']}>
                <Typography variant='subtitle' color='white'>Клиент</Typography>
            </div>
            <ColStripe />
            <div className={styles['car-number']}>
                <Typography variant='subtitle' color='white'>Номер машины</Typography>
            </div>
            <ColStripe />
            <div className={styles['type']}>
                <Typography variant='subtitle' color='white'>Тип</Typography>
            </div>
            <ColStripe />
            <div className={styles['created-at']}>
                <Typography variant='subtitle' color='white'>Дата создания</Typography>
            </div>
            <ColStripe />
            <div className={styles['actions']}>
                <Typography variant='subtitle' color='white'>Действия</Typography>
            </div>
        </div>
    )
}

export default TableHeader