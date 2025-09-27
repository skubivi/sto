import { useState } from 'react'
import Section from '../../../../components/ui/section/section'
import Typography from '../../../../components/ui/typography/typography'
import { ERoles, ERolesWithAll } from '../../../../services/types/user'
import TableHeader from './components/table-header/table-header'
import Pagination from '../../../../components/ui/pagination/paginations'
import { useDeletePersonMutation, useGetPersonalQuery } from '../../../../services/api/personal'

import styles from './style.module.scss'
import Table from './components/table/table'
import AddPersonal from './components/add-personal/add-personal'
import DeleteModal from '../../../../components/delete-modal/delete-modal'
import StyledModal from '../../../../components/ui/styled-modal/styled-modal'
import ChangePasswordModal from './components/change-password-modal/change-password-modal'
import { useGetMeQuery } from '../../../../services/api/user'

const fullAdminFilterOptions = [
    {
        id: ERolesWithAll.All,
        title: 'Все'
    },
    {
        id: ERolesWithAll.FullAdmin,
        title: 'Администраторы'
    },
    {
        id: ERolesWithAll.Admin,
        title: 'Администраторы фил.'
    },
    {
        id: ERolesWithAll.Receptionist,
        title: 'Приемщики',
    },
    {
        id: ERolesWithAll.Mechanic,
        title: 'Механики'
    },
]

const adminFilterOptions = [
    {
        id: ERolesWithAll.All,
        title: 'Все'
    },
    {
        id: ERolesWithAll.Receptionist,
        title: 'Приемщики',
    },
    {
        id: ERolesWithAll.Mechanic,
        title: 'Механики'
    },
]

const PersonalSection = () => {
    const { data: personal, isLoading: isPersonalLoading } = useGetPersonalQuery()
    const { data: me } = useGetMeQuery()
    const [deletePerson] = useDeletePersonMutation()

    const [filter, setFilter] = useState(ERolesWithAll.All)
    const [search, setSearch] = useState('')
    const [openDeleteModal, setOpenDeleteModal] = useState<number | undefined>(undefined)
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState<number | undefined>(undefined)
    const [itemsOnPage, setItemsOnPage] = useState<5 | 10 | 20 | 50>(5)
    const [page, setPage] = useState(0)

    if (!me) return null

    let filteredPersonal = personal?.data
    if (filter !== ERolesWithAll.All) filteredPersonal = filteredPersonal?.filter(el => el.role === filter as unknown as ERoles)
    if (search.length > 0) filteredPersonal = filteredPersonal?.filter(el => {
        if (search.split(' ').length === 1) {
            if (el.firstName.toLowerCase().includes(search.toLowerCase())) return true
            if (el.lastName.toLowerCase().includes(search.toLowerCase())) return true
            if (el.middleName.toLowerCase().includes(search.toLowerCase())) return true
        }
        else if ((el.lastName + ' ' + el.firstName + ' ' + el.middleName).toLowerCase().includes(search.toLowerCase())) return true
        return false
    })

    const onFilterChange = (id: ERolesWithAll) => {
        const filterOptions = me.role === ERoles.Admin ? adminFilterOptions : fullAdminFilterOptions
        const role = filterOptions.find(el => el.id === id)?.id
        if (role) setFilter(role as ERolesWithAll)
    }
    const handleChangeSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value)
    }
    const selectedPersonToDelete = personal?.data.find(el => el.id === openDeleteModal)
    const nameOfSelectedPersonToDelete = selectedPersonToDelete?.lastName + ' ' + selectedPersonToDelete?.firstName + ' ' + selectedPersonToDelete?.middleName

    return (
        <div className={styles.section}>
            {openDeleteModal !== undefined &&
                <StyledModal open={openDeleteModal !== undefined} onClose={() => setOpenDeleteModal(undefined)}>
                    <DeleteModal 
                        text={`Вы действительно хотите удалить учетную запись пользователя "${nameOfSelectedPersonToDelete}"?`}
                        onClose={() => setOpenDeleteModal(undefined)}
                        onDelete={() => {
                            deletePerson({id: openDeleteModal as number})
                            setOpenDeleteModal(undefined)
                        }}
                    />
                </StyledModal>
            }
            {openChangePasswordModal !== undefined &&
                <StyledModal open={openChangePasswordModal !== undefined} onClose={() => setOpenChangePasswordModal(undefined)}>
                    <ChangePasswordModal onClose={() => setOpenChangePasswordModal(undefined)} id={openChangePasswordModal}/>
                </StyledModal>
            }
            <Typography variant='h2' color='black'>Сотрудники</Typography>
            <Section>
                <div className={styles.table}>
                    <TableHeader 
                        onFilterChange={onFilterChange} 
                        activeFilter={filter} 
                        filterOptions={me.role === ERoles.Admin ? adminFilterOptions : fullAdminFilterOptions}
                        onChangeSearch={handleChangeSearch}
                        search={search}
                    />
                    <Table 
                        data={filteredPersonal}
                        isLoading={isPersonalLoading}
                        openChangePasswordModal={setOpenChangePasswordModal}
                        openDeleteModal={setOpenDeleteModal}
                        page={page}
                        itemsOnPage={itemsOnPage}
                    />
                    <Pagination 
                        itemsOnPage={itemsOnPage}
                        items={personal?.data.length ?? 0}
                        page={page}
                        onChangePage={setPage}
                        onChangeItemsOnPage={setItemsOnPage}
                    />
                    <AddPersonal />
                </div>
            </Section>
        </div>
    )
}

export default PersonalSection