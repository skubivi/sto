import { FC } from 'react'
import styles from './styled.module.scss'
import { monthTitles } from '../../helper-functions'
import Typography from '../../../../ui/typography/typography'

interface ICalendarMonthes {
    onChose: (m: number) => void
    selectedMonth: number
}

const CalendarMonthes: FC<ICalendarMonthes> = (props) => {
    
    return (
        <div className={styles.table}>
            <div className={styles.row}>
                <div className={`${styles.month} ${props.selectedMonth === 0 && styles.choosen}`} onClick={() => props.onChose(0)}>
                    <Typography color='white' variant='body'>{monthTitles[0][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 1 && styles.choosen}`} onClick={() => props.onChose(1)}>
                    <Typography color='white' variant='body'>{monthTitles[1][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 2 && styles.choosen}`} onClick={() => props.onChose(2)}>
                    <Typography color='white' variant='body'>{monthTitles[2][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 3 && styles.choosen}`} onClick={() => props.onChose(3)}>
                    <Typography color='white' variant='body'>{monthTitles[3][2]}</Typography>
                </div>
            </div>
            <div className={styles.row}>
                <div className={`${styles.month} ${props.selectedMonth === 4 && styles.choosen}`} onClick={() => props.onChose(4)}>
                    <Typography color='white' variant='body'>{monthTitles[4][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 5 && styles.choosen}`} onClick={() => props.onChose(5)}>
                    <Typography color='white' variant='body'>{monthTitles[5][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 6 && styles.choosen}`} onClick={() => props.onChose(6)}>
                    <Typography color='white' variant='body'>{monthTitles[6][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 7 && styles.choosen}`} onClick={() => props.onChose(7)}>
                    <Typography color='white' variant='body'>{monthTitles[7][2]}</Typography>
                </div>
            </div>
            <div className={styles.row}>
                <div className={`${styles.month} ${props.selectedMonth === 8 && styles.choosen}`} onClick={() => props.onChose(8)}>
                    <Typography color='white' variant='body'>{monthTitles[8][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 9 && styles.choosen}`} onClick={() => props.onChose(9)}>
                    <Typography color='white' variant='body'>{monthTitles[9][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 10 && styles.choosen}`} onClick={() => props.onChose(10)}>
                    <Typography color='white' variant='body'>{monthTitles[10][2]}</Typography>
                </div>
                <div className={`${styles.month} ${props.selectedMonth === 11 && styles.choosen}`} onClick={() => props.onChose(11)}>
                    <Typography color='white' variant='body'>{monthTitles[11][2]}</Typography>
                </div>
            </div>
        </div>
    )
}

export default CalendarMonthes