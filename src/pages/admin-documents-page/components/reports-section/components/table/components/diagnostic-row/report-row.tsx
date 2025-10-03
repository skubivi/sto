import { FC } from "react"
import ColStripe from "../../../../../../../../components/ui/col-stripe/col-stripe"
import Typography from "../../../../../../../../components/ui/typography/typography"
import { IDiagnosticDocument } from "../../../../../../../../services/types/documents"
import FilialField from "./components/filial-field/filial-field"
import ClientField from "./components/client-field/client-field"
import MechanicField from "./components/mechanic-field/mechanic-field"
import TitleField from "./components/title-field/title-field"

import CommentSvg from '../../../../../../../../assets/pages/admin-documents-page/comment.svg?react'

import styles from './style.module.scss'
import { useGetMeQuery } from "../../../../../../../../services/api/user"
import { ERoles } from "../../../../../../../../services/types/user"

interface IPersonalRow {
    data: IDiagnosticDocument
    onOpenComments: () => void
}

const ReportRow: FC<IPersonalRow> = (props) => {
    const createdAtDate = new Date(props.data.createdAt)
    const createdAtText = 
        createdAtDate.getDate().toString().padStart(2, '0') + '.' +
        (createdAtDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
        createdAtDate.getFullYear().toString()
    const { data: me } = useGetMeQuery()

    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <TitleField title={props.data.label} documentId={props.data.docId} />
                <FilialField filialId={props.data.filialId} />
                <MechanicField mechanicId={props.data.mechanicId}/>
                <ClientField clientDataId={props.data.clientDataId}/>
                <div className={styles.stripe}>
                    <ColStripe />
                </div>
                <div className={styles['car-number']}>
                    <Typography variant="body" color="secondary">{props.data.carNumber}</Typography>
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
                    <div className={styles.icon} onClick={props.onOpenComments} title="Комментарии">
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
                <div className={styles.stripe5}>
                    <ColStripe />
                </div>
                <div className={styles.stripe6}>
                    <ColStripe />
                </div>
            </div>
        </div>
    )
}

export default ReportRow