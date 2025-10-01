import { FC, useState } from "react"

import styles from './style.module.scss'
import DefaultButton from "../../../../../components/ui/default-button/default-button"
import { createReceptionistFilialReportBlob, downloadPdf, openPdf } from "../../../../../services/utils/helper-functions/pdf"
import { IReceptionistFilialReport } from "../../../../../services/types/analytics"
import StyledModal from "../../../../../components/ui/styled-modal/styled-modal"
import { useLazyGetDocumentQuery, useUploadDocumentReportMutation } from "../../../../../services/api/documents"
import { EReport } from "../../../../../services/types/documents"
import Typography from "../../../../../components/ui/typography/typography"
import Stripe from "../../../../../components/ui/stripe/stripe"

import AssignmentSvg from '../../../../../assets/pages/admin-documents-page/assignment.svg?react'
import { useCreateDataToPostFilialReceptionists } from "../../../../../services/hooks/use-create-data-to-post-filial-receptionists"

interface ICreateReportButton {
    data: IReceptionistFilialReport[]
    label: string
}

const CreateReportButton: FC<ICreateReportButton> = (props) => {
    const data = useCreateDataToPostFilialReceptionists(props.data)
    const [upload] = useUploadDocumentReportMutation()
    const [documentId, setDocumentId] = useState<string | undefined>(undefined)
    const [getDocument, {isFetching}] = useLazyGetDocumentQuery()

    const handleClick = async () => {
        const blob = await createReceptionistFilialReportBlob(data)
        try {
            const id = await upload({
                data: data,
                label: props.label,
                file: blob,
                type: EReport.Mech
            })
            setDocumentId(id.data?.docId)
        } catch { /* empty */ }
    }
    
    const handleOpenPdf = async () => {
        if (!isFetching && documentId !== undefined) {
            const { data } = await getDocument({id: documentId})

            if (data)
                openPdf(data.docLink)
        }
    }

    const handleDownloadPdf = async () => {
        if (!isFetching && documentId !== undefined) {
            const { data } = await getDocument({id: documentId})

            if (data)
                downloadPdf(data.docLink, `${props.label}.pdf`)
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles['button-container']}>
                <DefaultButton variant="primary" onClick={handleClick}>
                    создать отчет
                </DefaultButton>
            </div>
            {documentId !== undefined &&
                <StyledModal open={documentId !== undefined} onClose={() => setDocumentId(undefined)}>
                    <div className={styles.modal}>
                        <Typography variant="h2" color="white">Отчет</Typography>
                        <Stripe />
                        <div className={styles.label} onClick={handleOpenPdf}>
                            <div className={styles.icon}>
                                <AssignmentSvg />
                            </div>
                            <Typography variant="subtitle" color="primary2">{props.label}</Typography>
                        </div>
                        <DefaultButton variant="outline-primary" onClick={handleDownloadPdf}>скачать</DefaultButton>
                    </div>
                </StyledModal>
            }
        </div>
    )
}

export default CreateReportButton