import { FC, useState } from 'react'
import { useGetCommentsQuery, usePostCommentMutation } from '../../services/api/documents'

import styles from './style.module.scss'
import StyledModal from '../ui/styled-modal/styled-modal'
import Typography from '../ui/typography/typography'
import Stripe from '../ui/stripe/stripe'
import SendInput from '../ui/send-input/send-input'
import Loader from '../ui/loader/loader'
import Comment from './components/comment'

interface IDocumentComments {
    documentId: number
    open: boolean
    onClose: () => void
}

const DocumentComments: FC<IDocumentComments> = (props) => {
    const {data: comments, isLoading} = useGetCommentsQuery({id: props.documentId})
    const [postComment] = usePostCommentMutation()

    const [newComment, setNewComment] = useState('')

    const handleOnSend = () => {
        if (newComment.length > 0) {
            postComment({documentId: props.documentId, comment: newComment})
            setNewComment('')
        }
    }

    const sortedComments = comments?.data.slice()
    if (sortedComments) sortedComments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    if (!props.open) return null

    return (
        <StyledModal open={props.open} onClose={props.onClose}>
            <div className={styles.modal}>
                <Typography variant='h2' color='white'>Комментарии</Typography>
                <div className={styles.wrapper}>
                    <Stripe />
                    <div className={styles.comments}>
                        {isLoading || sortedComments === undefined ? (
                            <div className={styles['loading-body']}>
                                <div className={styles['loading-wrapper']}>
                                    <Loader />
                                </div>
                            </div>
                        ) : (
                            sortedComments.map(el =>
                                <Comment 
                                    reviewerId={el.reviewerId} 
                                    comment={el.comment} 
                                    createdAt={new Date(el.createdAt)}
                                    key={el.id}
                                />
                            )
                        )}
                        
                    </div>
                    <SendInput
                        onSend={handleOnSend}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder='Добавить комментарий...'
                    />
                </div>
            </div>
        </StyledModal>
    )
}

export default DocumentComments