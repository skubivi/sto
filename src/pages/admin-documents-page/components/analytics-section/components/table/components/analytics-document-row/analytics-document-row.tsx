import { FC } from "react"
import ColStripe from "../../../../../../../../components/ui/col-stripe/col-stripe"
import Typography from "../../../../../../../../components/ui/typography/typography"
import { EReport, IDocumentReport } from "../../../../../../../../services/types/documents"
import TitleField from "./components/title-field/title-field"
import FilialField from "./components/filial-field/filial-field"

import CommentSvg from '../../../../../../../../assets/pages/admin-documents-page/comment.svg?react'


import styles from './style.module.scss'
import { useGetMeQuery } from "../../../../../../../../services/api/user"
import { ERoles } from "../../../../../../../../services/types/user"

interface IPersonalRow {
    data: IDocumentReport
    onOpenComments: () => void
}

const AnalyticsDocumentRow: FC<IPersonalRow> = (props) => {
    const { data: me } = useGetMeQuery()
    
    const createdAtDate = new Date(props.data.createdAt)
    const createdAtText = 
        createdAtDate.getDate().toString().padStart(2, '0') + '.' +
        (createdAtDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
        createdAtDate.getFullYear().toString()
    const typeText
        = props.data.type === EReport.Mech ? 'Проделаные работы (в общем)'
        : props.data.type === EReport.Rec ? 'Принятые машины (в общем)'
        : props.data.type === EReport.MechFil ? 'Проделаные работы (по ст.)'
        : 'Принятые машины (по ст.)'

    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <TitleField title={props.data.label} documentId={props.data.docId} />
                <FilialField filialId={props.data.filialId} />
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['type']}>
                    <Typography variant="body" color="secondary">{typeText}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['created-at']}>
                    <Typography variant="body" color="secondary">{createdAtText}</Typography>
                </div>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['actions']}>
                    <div className={styles.icon} onClick={props.onOpenComments}>
                        <CommentSvg />
                    </div>
                </div>
            </div>
            <div className={styles['stripe-container']}>
                {me?.role === ERoles.FullAdmin && 
                    <div className={styles.stripe1}>
                        <ColStripe />
                    </div>
                }
                <div className={styles.stripe2}>
                    <ColStripe />
                </div>
                <div className={styles.stripe3}>
                    <ColStripe />
                </div>
                <div className={styles.stripe4}>
                    <ColStripe />
                </div>
            </div>
        </div>
    )
}

export default AnalyticsDocumentRow