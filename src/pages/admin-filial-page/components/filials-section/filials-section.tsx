import Loader from '../../../../components/ui/loader/loader'
import Section from '../../../../components/ui/section/section'
import Stripe from '../../../../components/ui/stripe/stripe'
import Typography from '../../../../components/ui/typography/typography'
import { useDeleteFilialMutation, useGetFilialsQuery } from '../../../../services/api/filial'
import styles from './style.module.scss'
import TitleRow from './components/title-row/title-row'
import ColStripe from '../../../../components/ui/col-stripe/col-stripe'
import FilialRow from './components/filial-row/filial-row'
import { useState } from 'react'
import StyledModal from '../../../../components/ui/styled-modal/styled-modal'
import { TFilialWithId } from '../../../../services/types/filial'
import DefaultButton from '../../../../components/ui/default-button/default-button'
import AddModal from './components/add-modal/add-modal'
import DeleteModal from '../../../../components/delete-modal/delete-modal'

const FilialsSection = () => {
    const { data: filials, isLoading: filialsIsLoading } = useGetFilialsQuery()
    const [deleteFilial] = useDeleteFilialMutation()

    const [openDeleteModal, setOpenDeleteModal] = useState<TFilialWithId | undefined>(undefined)
    const [openAddModal, setOpenAddModal] = useState(false)

    const handleOpenDeleteModal = (element: TFilialWithId) => {
        setOpenDeleteModal(element)
    }
    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(undefined)
    }
    const handleOpenAddModal = () => {
        setOpenAddModal(true)
    }
    const handleCloseAddModal = () => {
        setOpenAddModal(false)
    }

    const handleDelete = () => {
        if (openDeleteModal) {
            deleteFilial({id: openDeleteModal.id})
            handleCloseDeleteModal()
        }    
    }

    return (
        <div className={styles.section}>
            <Typography variant='h2' color='black'>Филиалы</Typography>
            <Section>
                <div className={styles['table']}>
                    <TitleRow />
                    <Stripe />
                    {filialsIsLoading ? (
                        <div className={styles['loading-body']}>
                            <div className={styles['loading-wrapper']}>
                                <Loader />
                            </div>
                        </div>
                    ) : (
                        <div className={styles['table-body']}>
                            <div className={styles['col-stripe']}>
                                <ColStripe />
                            </div>
                            <div className={styles['filials']}>
                                {filials?.data.map(element => (
                                    <div key={element.id} className={styles['filial-row']}>
                                        <FilialRow title={element.title} id={element.id} openDeleteModal={() => handleOpenDeleteModal(element)}/>
                                        <div className={styles['col-stripe2']}>
                                            <ColStripe />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={styles.button}>
                        <DefaultButton variant='primary' onClick={handleOpenAddModal}>
                            Добавить
                        </DefaultButton>
                    </div>
                </div>
            </Section>
            {openDeleteModal !== undefined &&
                <StyledModal open={openDeleteModal !== undefined} onClose={handleCloseDeleteModal}>
                    <DeleteModal 
                        onClose={handleCloseDeleteModal} 
                        onDelete={handleDelete} 
                        text={`Вы действительно хотите удалить "${openDeleteModal.title}"?`}
                    />
                </StyledModal>
            }
            {openAddModal &&
                <StyledModal open={openAddModal} onClose={handleCloseAddModal}>
                    <AddModal onClose={handleCloseAddModal}/>
                </StyledModal>
            }
        </div>
    )
}

export default FilialsSection