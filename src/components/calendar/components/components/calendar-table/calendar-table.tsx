import { FC, ReactNode } from 'react'
import Typography from '../../../../ui/typography/typography'
import { dayOfWeekTitles, getMonthLength, getPrevMonthLength } from '../../helper-functions'
import styles from './styled.module.scss'

interface IData {
    number: number,
    status: 'prevMonth' | 'currentMonth' | 'nextMonth'
}

interface ICalendarTable {
    selectedMonth: number
    selectedYear: number
    onChose: (d: number, m: number, y: number) => void
    chosenDate: Date
}

const CalendarTable: FC<ICalendarTable> = (props) => {
    const firstDayOfWeek = new Date(props.selectedYear, props.selectedMonth, 1).getDay()
    const currentMonthLength = getMonthLength(props.selectedMonth, props.selectedYear)
    const prevMonthLength = getPrevMonthLength(props.selectedMonth, props.selectedYear)
    const firstNumber: IData = firstDayOfWeek === 1 
        ? {
            number: 1, 
            status: 'currentMonth'
        } 
        : {
            number: prevMonthLength - firstDayOfWeek + 2,
            status: 'prevMonth'
        }

    const data: IData[][] = []
    const getNextData: (c: IData) => IData = (c) => {
        let newNumber = c.number + 1
        let newStatus = c.status

        if (c.status === 'prevMonth' && newNumber > prevMonthLength) {
            newStatus = 'currentMonth'
            newNumber = 1
        } else if (c.status === 'currentMonth' && newNumber > currentMonthLength) {
            newStatus = 'nextMonth'
            newNumber = 1
        }

        return {
            status: newStatus,
            number: newNumber
        }
    }
    const isChosen = (d: IData) => {
        let currentMonth
            = d.status ==='currentMonth' ? props.selectedMonth 
            : d.status === 'nextMonth' ? props.selectedMonth + 1
            : props.selectedMonth - 1
        let currentYear = props.selectedYear
        if (currentMonth === 12) {
            currentYear++
            currentMonth = 0
        }
        else if (currentMonth === -1) {
            currentYear--
            currentMonth = 11
        }
        const currentDay = d.number

        return (props.chosenDate.getDate() === currentDay && props.chosenDate.getMonth() === currentMonth && props.chosenDate.getFullYear() === currentYear)
    }
    const handleOnChose = (d: IData) => {
        let currentMonth
            = d.status ==='currentMonth' ? props.selectedMonth 
            : d.status === 'nextMonth' ? props.selectedMonth + 1
            : props.selectedMonth - 1
        let currentYear = props.selectedYear
        if (currentMonth === 12) {
            currentYear++
            currentMonth = 0
        }
        else if (currentMonth === -1) {
            currentYear--
            currentMonth = 11
        }
        const currentDay = d.number

        return () => props.onChose(currentDay, currentMonth, currentYear)
    }

    const rows: ReactNode[][] = []

    let current = firstNumber
    for (let i = 0; i < 6; i++) {
        data.push([])
        rows.push([])
        for (let j = 0; j < 7; j++) {
            data[i].push(current)
            current = getNextData(current)
        }
    }

    data.forEach((el, index) => {
        el.forEach((element, index2) => {
            rows[index].push(
                <div 
                    className={`${styles.day} ${isChosen(element) && styles.choosen} ${(element.status === 'nextMonth' || element.status === 'prevMonth') && styles.unclickable}`} key={index + '_' + index2}
                    onClick={handleOnChose(element)}
                >
                    <Typography color='white' variant='body'>{element.number}</Typography>
                </div>
            )
        })
    })

    return (
        <div className={styles.table}>
            <div className={styles.row}>
                {dayOfWeekTitles.map((el, i) => (
                    <div key={i} className={styles.week}>
                        <Typography color='white' variant='body'>{el[0]}</Typography>
                    </div>
                ))}
            </div>
            {rows.map((el, index) => (
                <div className={styles.row} key={index}>
                    {el.map(element => element)}
                </div>
            ))}
        </div>
    )
}

export default CalendarTable