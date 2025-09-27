import styles from './style.module.scss'

import CalendarSvg from '../../assets/components/calendar/calendar_month.svg?react'
import { FC, useEffect, useRef, useState } from 'react'
import Typography from '../ui/typography/typography'
import CalendarMenu from './components/calendar-menu'

interface ICalendar {
    chosenDate: Date
    onChose: (d: Date) => void
}

const Calendar: FC<ICalendar> = (props) => {
    const [open, setOpen] = useState(false)
    const menuRef: React.Ref<HTMLDivElement> = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) 
                setTimeout(() => {
                    setOpen(false)
                }, 100)
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open])

    const chosenDateText = 
        props.chosenDate.getDate().toString().padStart(2, '0') + '.' +
        (props.chosenDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
        props.chosenDate.getFullYear().toString()
    return (
        <div id='calendar' className={styles.calendar} onClick={(e) => {
            if (e.target.id === 'calendar') {
                setOpen(prev => !prev)
            }
        }}>
            <CalendarSvg />
            <Typography id='calendar' variant='subtitle' color='secondary'>{chosenDateText}</Typography>
            {open &&
                <CalendarMenu ref={menuRef} onClose={() => setOpen(false)} onChose={props.onChose} chosenDate={props.chosenDate} />
            }
        </div>
    )
}

export default Calendar