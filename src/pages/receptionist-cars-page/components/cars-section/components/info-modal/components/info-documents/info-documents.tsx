import { FC } from "react";

import styles from './style.module.scss'
import Typography from "../../../../../../../../components/ui/typography/typography";
import { useGetCarDocumentsQuery } from "../../../../../../../../services/api/cars";
import Loader from "../../../../../../../../components/ui/loader/loader";
import { useLazyGetDocumentQuery } from "../../../../../../../../services/api/documents";
import { openPdf } from "../../../../../../../../services/utils/helper-functions/pdf";
import AssignmentSvg from '../../../../../../../../assets/pages/admin-documents-page/assignment.svg?react'

interface IInfoDocuments {
    carId: string
}

const InfoDocuments: FC<IInfoDocuments> = (props) => {
    const { data: documents, isLoading} = useGetCarDocumentsQuery({carId: props.carId})
    const [getDocument, {isFetching}] = useLazyGetDocumentQuery()
    const handleOpen = async (id: string) => {
        if (!isFetching) {
            const { data } = await getDocument({id})

            if (data)
                openPdf(data.docLink)
        }
    }

    if (isLoading || !documents) return (
        <div className="loading-body">
            <div className="loading-wrapper">
                <Loader />
            </div>
        </div>
    )
    return (
        <>
            <Typography variant="caption" color="secondary3">Список документов</Typography>
            <div className={styles.documents}>
                {documents.data.map(el => (
                    <div className={styles.title} onClick={() => handleOpen(el.id)}>
                        <div className={styles.icon}>
                            <AssignmentSvg />
                        </div>
                        <Typography variant="body" color="primary2" underline>{el.label}</Typography>
                    </div>
                ))}
            </div>
        </>
    )
}

export default InfoDocuments