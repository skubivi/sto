import { FC, useState } from 'react'
import DateFilter from '../../../../../../../../components/date-filter/date-filter'
import Loader from '../../../../../../../../components/ui/loader/loader'
import Stripe from '../../../../../../../../components/ui/stripe/stripe'
import StyledMultiSelectWithLabel from '../../../../../../../../components/ui/styled-multi-select-with-label/styled-multi-select-with-label'
import Typography from '../../../../../../../../components/ui/typography/typography'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'

import styles from './style.module.scss'

interface IFilterModal {
    dateFrom: Date
    setDateFrom: (d: Date) => void
    dateTo: Date
    setDateTo: (d: Date) => void
    mechanics: {
        id: number
        title: string
    }[] | undefined
    isMechanicsLoading: boolean
    chosenMechanics: {
        id: number,
        title: string
    }[]
    setChosenMechanics: React.Dispatch<React.SetStateAction<{
        id: number;
        title: string;
    }[]>>
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
    const [chosenFilials, setChosenFilials] = useState(props.chosenFilials)
    const [chosenMechanics, setChosenMechanics] = useState(props.chosenMechanics)

    const handleAddMechanic = (id: number) => {
        const mechanic = props.mechanics?.find(el => el.id === id)
        if (!mechanic) return
        setChosenMechanics(prev => {
            if (prev.findIndex(el => el.id === id) === -1) {
                return [...prev, {id: mechanic.id, title: mechanic.title}]
            }
            return prev
        })
    }
    const handleRemoveMechanic = (id: number) => {
        setChosenMechanics(prev => {
            const index = prev.findIndex(el => el.id === id)
            if (index === -1) return prev
            return [...prev.slice(0, index), ...prev.slice(index + 1)]
        })
    }
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
        props.setChosenMechanics(chosenMechanics)
        props.setDateFrom(dateFrom)
        props.setDateTo(dateTo)
        props.onClose()
    }

    return (
        <div className={styles['filters-modal']}>
            <Typography variant='h2' color='white'>Фильтры</Typography>
            <Stripe />
            <div className={styles.filters}>
                <DateFilter from={dateFrom} to={dateTo} onChoseFrom={setDateFrom} onChoseTo={setDateTo} />
                <div className={styles['filters-without-date']}>
                    {
                        props.isMechanicsLoading ? (
                            <div className={styles['loader-body']}>
                                <div className={styles['loader-wrapper']}>
                                    <Loader />
                                </div>
                            </div>
                        ) : (
                            <StyledMultiSelectWithLabel 
                                active={chosenMechanics} 
                                options={props.mechanics as {
                                    id: number,
                                    title: string
                                }[]}
                                onAdd={handleAddMechanic}
                                onRemove={handleRemoveMechanic}
                                label="Механики"
                            />
                        )
                    }
                    {
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