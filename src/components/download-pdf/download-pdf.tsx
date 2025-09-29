import { FC } from 'react'
import { useLazyGetDocumentQuery } from '../../services/api/documents'
import { downloadPdf } from '../../services/utils/helper-functions/pdf'

import DownloadSvg from '../../assets/pages/admin-documents-page/download.svg?react'

import styles from './style.module.scss'

interface IDownloadPdf {
    title: string
    documentId: string
}

const DownloadPdf: FC<IDownloadPdf> = (props) => {
    const [getDocument, {isFetching}] = useLazyGetDocumentQuery()

    const handleClick = async () => {
        if (!isFetching) {
            const { data } = await getDocument({id: props.documentId})

            if (data)
                downloadPdf(data, props.title + '.pdf')
        }
    }

    return (
        <div className={styles.icon} onClick={handleClick}>
            <DownloadSvg />
        </div>
    )
}

export default DownloadPdf