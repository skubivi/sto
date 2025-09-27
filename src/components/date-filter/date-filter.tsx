import { FC } from 'react'
import Typography from '../ui/typography/typography'
import Calendar from '../calendar/calendar'
import { getMonthLength, getPrevMonthLength } from '../calendar/components/helper-functions'

import styles from './style.module.scss'

interface IDateFilter {
    from: Date
    to: Date
    onChoseFrom: (d: Date) => void
    onChoseTo: (d: Date) => void
}

const DateFilter: FC<IDateFilter> = (props) => {
    const getNextDay = (d: Date) => {
        let day = d.getDate()
        let month = d.getMonth()
        let year = d.getFullYear()
        const currentMonthLength = getMonthLength(month, year)

        day++
        if (day > currentMonthLength) {
            day = 1
            month++
        }
        if (month > 11) {
            month = 0
            year++
        }
        return new Date(year, month, day)
    }
    const getPrevDay = (d: Date) => {
        let day = d.getDate()
        let month = d.getMonth()
        let year = d.getFullYear()
        const prevMonthLength = getPrevMonthLength(month, year)

        day--
        if (day < 1) {
            day = prevMonthLength
            month--
        }
        if (month < 0) {
            month = 11
            year--
        }
        return new Date(year, month, day)
    }

    const prevTo = getPrevDay(props.to)

    const handleChoseTo = (d: Date) => {
        props.onChoseTo(getNextDay(d))
        if (d.getTime() < props.from.getTime()) {
            props.onChoseFrom(d)
        }
    }
    const handleChoseFrom = (d: Date) => {
        props.onChoseFrom(d)
        if (d.getTime() > props.to.getTime()) {
            props.onChoseTo(getNextDay(d))
        }
    }

    return (
        <div className={styles['date-filter']}>
            <Typography variant='subtitle' color='secondary'>c</Typography>
            <Calendar chosenDate={props.from} onChose={handleChoseFrom} />
            <Typography variant='subtitle' color='secondary'>по</Typography>
            <Calendar chosenDate={prevTo} onChose={handleChoseTo} />
        </div>
    )
}

export default DateFilter