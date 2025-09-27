import { FC, useState } from 'react'
import styles from './styled.module.scss'
import Typography from '../../ui/typography/typography'

import ArrowDownSvg from '../../../assets/components/calendar/calendar-arrow-down.svg?react'
import ArrowUpSvg from '../../../assets/components/calendar/calendar-arrow-up.svg?react'
import { getSubtitle, getTitle } from './helper-functions'
import CalendarMonthes from './components/calendar-monthes/calendar-monthes'
import CalendarTable from './components/calendar-table/calendar-table'

interface ICalendarMenu {
    ref: React.Ref<HTMLDivElement>
    onClose: () => void
    onChose: (d: Date) => void
    chosenDate: Date
}

const CalendarMenu: FC<ICalendarMenu> = (props) => {
    const [selectedMonth, setSelectedMonth] = useState(props.chosenDate.getMonth())
    const [selectedYear, setSelectedYear] = useState(props.chosenDate.getFullYear())
    const [selectedMode, setSelectedMode] = useState<'Month' | 'Year'>('Month')

    const handlePrevYear = () => setSelectedYear(prev => prev - 1)
    const handleNextYear = () => setSelectedYear(prev => prev + 1)
    const handlePrevMonth = () => setSelectedMonth(prev => {
        if (prev === 0) {
            handlePrevYear()
            return 11
        }
        return prev - 1
    })
    const handleNextMonth = () => setSelectedMonth(prev => {
        if (prev === 11) {
            handleNextYear()
            return 0
        }
        return prev + 1
    })
    const handleMonthChose = (m: number) => {
        setSelectedMode('Month')
        setSelectedMonth(m)
    }

    const clickableSubtitle = selectedMode === 'Month'
    const title = getTitle(props.chosenDate)
    const subtitle = getSubtitle(selectedMonth, selectedYear, selectedMode)

    const handleSubtitleClick = () => {
        if (clickableSubtitle)
            setSelectedMode('Year')
    }
    const handleNextArrow = () => {
        if (selectedMode === 'Month') handleNextMonth()
        if (selectedMode === 'Year') handleNextYear()
    }
    const handlePrevArrow = () => {
        if (selectedMode === 'Month') handlePrevMonth()
        if (selectedMode === 'Year') handlePrevYear()
    }

    const handleOnChoseDay = (d: number, m: number, y: number) => {
        props.onChose(new Date(y, m, d))
        props.onClose()
    }

    return (
        <div className={styles.menu} ref={props.ref}>
            <div className={styles['title-row']}>
                <Typography variant='body' color='white'>{title}</Typography>
            </div>
            <div className={styles['menu-body']}>
                <div className={styles['body-title']}>
                    <div className={`${styles.subtitle} ${!clickableSubtitle && styles.unclickable}`} onClick={handleSubtitleClick}>
                        <Typography variant='subtitle' color={clickableSubtitle ? 'white' : 'secondary2'}>{subtitle}</Typography>
                    </div>
                    <div className={styles.arrows}>
                        <div className={styles['next-arrow']} onClick={handleNextArrow}>
                            <ArrowUpSvg />
                        </div>
                        <div className={styles['prev-arrow']} onClick={handlePrevArrow}>
                            <ArrowDownSvg />
                        </div>
                    </div>
                </div>
                <div className={styles.table}>
                    {selectedMode === 'Year'
                       ? <CalendarMonthes onChose={handleMonthChose} selectedMonth={selectedMonth}/>
                       : <CalendarTable selectedMonth={selectedMonth} selectedYear={selectedYear} onChose={handleOnChoseDay} chosenDate={props.chosenDate}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default CalendarMenu