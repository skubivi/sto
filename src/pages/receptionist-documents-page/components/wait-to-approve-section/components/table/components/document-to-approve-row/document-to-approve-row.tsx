import { FC } from "react"
import ColStripe from "../../../../../../../../components/ui/col-stripe/col-stripe"
import Typography from "../../../../../../../../components/ui/typography/typography"
import { EDiagnostic, IDocumentToApprove } from "../../../../../../../../services/types/documents"
import ClientField from "./components/client-field/client-field"
import MechanicField from "./components/mechanic-field/mechanic-field"

import ApproveSvg from '../../../../../../../../assets/pages/admin-documents-page/approve.svg?react'
import CancelSvg from '../../../../../../../../assets/pages/admin-documents-page/cancel.svg?react'
import CommentSvg from '../../../../../../../../assets/pages/admin-documents-page/comment.svg?react'

import styles from './style.module.scss'
import TitleField from "./components/title-field/title-field"
import DownloadPdf from "../../../../../../../../components/download-pdf/download-pdf"

interface IPersonalRow {
    data: IDocumentToApprove
    onOpenComments: () => void
    onDecline: () => void
    onApprove: () => void
}

const DocumentToApproveRow: FC<IPersonalRow> = (props) => {
    const createdAtDate = new Date(props.data.createdAt)
    const createdAtText = 
        createdAtDate.getDate().toString().padStart(2, '0') + '.' +
        (createdAtDate.getMonth() + 1).toString().padStart(2, '0') + '.' +
        createdAtDate.getFullYear().toString()
    const typeText = props.data.type === EDiagnostic.Metalworker || props.data.type === EDiagnostic.Electric ? 'Диагностика' : 'Отчет'

    return (
        <div className={styles['row-container']}>
            <div className={styles.row}>
                <TitleField title={props.data.label} documentId={props.data.id} />
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
                    <div className={styles.icon} onClick={props.onApprove}>
                        <ApproveSvg />
                    </div>
                    <DownloadPdf documentId={props.data.id} title={props.data.label}/>
                    <div className={styles.icon} onClick={props.onOpenComments}>
                        <CommentSvg />
                    </div>
                    <div className={styles.icon} onClick={props.onDecline}>
                        <CancelSvg />
                    </div>
                </div>
            </div>
            <div className={styles['stripe-container']}>
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
                <div className={styles.stripe7}>
                    <ColStripe />
                </div>
            </div>
        </div>
    )
}

export default DocumentToApproveRow