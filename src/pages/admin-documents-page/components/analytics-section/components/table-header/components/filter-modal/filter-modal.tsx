import { FC, useState } from 'react'
import DateFilter from '../../../../../../../../components/date-filter/date-filter'
import Loader from '../../../../../../../../components/ui/loader/loader'
import Stripe from '../../../../../../../../components/ui/stripe/stripe'
import StyledMultiSelectWithLabel from '../../../../../../../../components/ui/styled-multi-select-with-label/styled-multi-select-with-label'
import Typography from '../../../../../../../../components/ui/typography/typography'
import { EReportWithAll } from '../../../../../../../../services/types/documents'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'

import styles from './style.module.scss'
import { useGetMeQuery } from '../../../../../../../../services/api/user'
import { ERoles } from '../../../../../../../../services/types/user'
import StyledSelectWithLabel from '../../../../../../../../components/ui/styled-select-with-label/styled-select-with-label'

const fullAdminTypeOptions = [
    {
        id: EReportWithAll.All,
        title: 'Все'
    },
    {
        id: EReportWithAll.Mech,
        title: 'Проделаные работы (в общем)'
    },
    {
        id: EReportWithAll.MechFil,
        title: 'Проделаные работы (по ст.)'
    },
    {
        id: EReportWithAll.Rec,
        title: 'Принятые машины (в общем)'
    },
    {
        id: EReportWithAll.RecFil,
        title: 'Принятые машины (по ст.)'
    },
]

const adminTypeOptions = [
    {
        id: EReportWithAll.All,
        title: 'Все'
    },
    {
        id: EReportWithAll.MechFil,
        title: 'Проделаные работы (по ст.)'
    },
    {
        id: EReportWithAll.RecFil,
        title: 'Принятые машины (по ст.)'
    },

]

interface IFilterModal {
    dateFrom: Date
    setDateFrom: (d: Date) => void
    dateTo: Date
    setDateTo: (d: Date) => void
    type: EReportWithAll,
    setType: (t: EReportWithAll) => void
    filials: {
        id: number,
        title: string
    }[] | undefined
    isFilialsLoading: boolean
    chosenFilials: {
        id: number,
        title: string
    }[]
    setChosenFilials: React.Dispatch<React.SetStateAction<{
        id: number;
        title: string;
    }[]>>
    onClose: () => void
}

const FilterModal: FC<IFilterModal> = (props) => {
    const [dateFrom, setDateFrom] = useState(props.dateFrom)
    const [dateTo, setDateTo] = useState(props.dateTo)
    const [type, setType] = useState(props.type)
    const [chosenFilials, setChosenFilials] = useState(props.chosenFilials)

    const { data: me } = useGetMeQuery()

    const handleAddFilial = (id: number) => {
        const filial = props.filials?.find(el => el.id === id)
        if (!filial) return
        setChosenFilials(prev => {
            if (prev.findIndex(el => el.id === id) === -1) {
                return [...prev, {id: filial.id, title: filial.title}]
            }
            return prev
        })
    }
    const handleRemoveFilial = (id: number) => {
        setChosenFilials(prev => {
            const index = prev.findIndex(el => el.id === id)
            if (index === -1) return prev
            return [...prev.slice(0, index), ...prev.slice(index + 1)]
        })
    }
    const handleSubmit = () => {
        props.setChosenFilials(chosenFilials)
        props.setDateFrom(dateFrom)
        props.setDateTo(dateTo)
        props.setType(type)
        props.onClose()
    }

    if (me?.role === ERoles.Admin) return (
        <div className={styles['filters-modal']}>
            <Typography variant='h2' color='white'>Фильтры</Typography>
            <Stripe />
            <div className={styles.filters}>
                <DateFilter from={dateFrom} to={dateTo} onChoseFrom={setDateFrom} onChoseTo={setDateTo} />
                <div className={styles['filters-without-date']}>
                    <StyledSelectWithLabel active={type} options={adminTypeOptions} onChange={setType} label='Тип'/>
                </div>
                <div className={styles.buttons}>
                    <DefaultButton variant='outline-primary' onClick={handleSubmit}>применить</DefaultButton>
                    <DefaultButton variant='outline-secondary3' onClick={props.onClose}>Отменить</DefaultButton>
                </div>
            </div>
        </div>
    )

    return (
        <div className={styles['filters-modal']}>
            <Typography variant='h2' color='white'>Фильтры</Typography>
            <Stripe />
            <div className={styles.filters}>
                <DateFilter from={dateFrom} to={dateTo} onChoseFrom={setDateFrom} onChoseTo={setDateTo} />
                <div className={styles['filters-without-date']}>
                    <StyledSelectWithLabel active={type} options={fullAdminTypeOptions} onChange={setType} label='Тип'/>
                    {(type === EReportWithAll.MechFil || type === EReportWithAll.RecFil) ? null :
                        props.isFilialsLoading ? (
                            <div className={styles['loader-body']}>
                                <div className={styles['loader-wrapper']}>
                                    <Loader />
                                </div>
                            </div>
                        ) : (
                            <StyledMultiSelectWithLabel 
                                active={chosenFilials} 
                                options={props.filials as {
                                    id: number,
                                    title: string
                                }[]}
                                onAdd={handleAddFilial}
                                onRemove={handleRemoveFilial}
                                label="Станции"
                            />
                        )
                    }
                </div>
                <div className={styles.buttons}>
                    <DefaultButton variant='outline-primary' onClick={handleSubmit}>применить</DefaultButton>
                    <DefaultButton variant='outline-secondary3' onClick={props.onClose}>Отменить</DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default FilterModal