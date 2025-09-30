import { FC } from "react"
import AssignmentSvg from '../../../../../../../../../../assets/pages/admin-documents-page/assignment.svg?react'
import Typography from "../../../../../../../../../../components/ui/typography/typography"
import { useLazyGetDocumentQuery } from "../../../../../../../../../../services/api/documents"
import { openPdf } from "../../../../../../../../../../services/utils/helper-functions/pdf"

import styles from './style.module.scss'

interface ITitleField {
    documentId: string
    title: string
}

const TitleField: FC<ITitleField> = (props) => {
    const [getDocument, {isFetching}] = useLazyGetDocumentQuery()

    const handleOpen = async () => {
        if (!isFetching) {
            const { data } = await getDocument({id: props.documentId})

            if (data)
                openPdf(data.docLink)
        }
    }

    return (
        <div className={styles.title} onClick={handleOpen} >
            <AssignmentSvg />
            <Typography variant="body" color="primary2" underline>{props.title}</Typography>
        </div>
    )
}

export default TitleField