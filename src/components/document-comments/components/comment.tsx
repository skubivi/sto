import { FC, useEffect, useState } from "react"

import styles from './style.module.scss'
import Typography from "../../ui/typography/typography"
import { useGetUserPersonalDataQuery } from "../../../services/api/user"

interface IComment {
    reviewerId: string
    comment: string
    createdAt: Date
}

const Comment: FC<IComment> = (props) => {
    const [reviewerNames, setReviewerNames] = useState("");

    const { data, isSuccess } = useGetUserPersonalDataQuery({id: props.reviewerId})

    useEffect(() => {
        if (data) setReviewerNames(`${data.lastName} ${data.firstName[0]}.${data.middleName[0]}.`)
    }, [isSuccess])

    const createdAt = new Date(props.createdAt)
    const now = new Date(Date.now())
    const isCurrentDay = createdAt.getDate() === now.getDate() && createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()

    const createdAtDayText = createdAt.getDate().toString().padStart(2, '0')
    const createdAtMonthText = (createdAt.getMonth() + 1).toString().padStart(2, '0')
    const createdAtYearText = createdAt.getFullYear().toString()
    const createdAtHoursText = createdAt.getHours().toString().padStart(2, '0')
    const createdAtMinutesText = createdAt.getMinutes().toString().padStart(2, '0')

    const timeText = isCurrentDay 
        ? `${createdAtHoursText}:${createdAtMinutesText}`
        : `${createdAtDayText}.${createdAtMonthText}.${createdAtYearText} ${createdAtHoursText}:${createdAtMinutesText}`

    return (
        <div className={styles.comment}>
            <Typography variant="caption" color="primary2">{reviewerNames}</Typography>
            <Typography variant="body-small" color="secondary">{props.comment}</Typography>
            <div className={styles.date}>
                <Typography variant="note-caption" color="secondary3">{timeText}</Typography>
            </div>
        </div>
    )
}

export default Comment