import { FC, useState } from 'react'
import DateFilter from '../../../../../../../../components/date-filter/date-filter'
import Loader from '../../../../../../../../components/ui/loader/loader'
import Stripe from '../../../../../../../../components/ui/stripe/stripe'
import StyledMultiSelectWithLabel from '../../../../../../../../components/ui/styled-multi-select-with-label/styled-multi-select-with-label'
import Typography from '../../../../../../../../components/ui/typography/typography'
import DefaultButton from '../../../../../../../../components/ui/default-button/default-button'

import styles from './style.module.scss'
import { ECarStatusWithAll } from '../../../../../../../../services/types/cars'
import StyledSelectWithLabel from '../../../../../../../../components/ui/styled-select-with-label/styled-select-with-label'

const options = [
    {
        id: ECarStatusWithAll.All,
        title: 'Все'
    },
    {
        id: ECarStatusWithAll.Created,
        title: 'В приемке'
    },
    {
        id: ECarStatusWithAll.Processed,
        title: 'Продиагностирована'
    },
    {
        id: ECarStatusWithAll.Finished,
        title: 'Отдана'
    },
]

interface IFilterModal {
    dateTo: Date
    dateFrom: Date
    onChangeDateTo: (d: Date) => void
    onChangeDateFrom: (d: Date) => void
    receptionists: {
        id: string
        title: string
    }[] | undefined
    isReceptionistsLoading: boolean
    chosenReceptionists: {
        id: string,
        title: string
    }[]
    setChosenReceptionists: React.Dispatch<React.SetStateAction<{
        id: string;
        title: string;
    }[]>>
    status: ECarStatusWithAll
    onChangeStatus: React.Dispatch<React.SetStateAction<ECarStatusWithAll>>
    onClose: () => void
}

const FilterModal: FC<IFilterModal> = (props) => {
    const [dateFrom, setDateFrom] = useState(props.dateFrom)
    const [dateTo, setDateTo] = useState(props.dateTo)
    const [chosenReceptionists, setChosenReceptionists] = useState(props.chosenReceptionists)
    const [status, setStatus] = useState(props.status)

    const handleAddReceptionists = (id: string) => {
        const mechanic = props.receptionists?.find(el => el.id === id)
        if (!mechanic) return
        setChosenReceptionists(prev => {
            if (prev.findIndex(el => el.id === id) === -1) {
                return [...prev, {id: mechanic.id, title: mechanic.title}]
            }
            return prev
        })
    }
    const handleRemoveReceptionists = (id: string) => {
        setChosenReceptionists(prev => {
            const index = prev.findIndex(el => el.id === id)
            if (index === -1) return prev
            return [...prev.slice(0, index), ...prev.slice(index + 1)]
        })
    }

    const handleSubmit = () => {
        props.setChosenReceptionists(chosenReceptionists)
        props.onChangeDateFrom(dateFrom)
        props.onChangeDateTo(dateTo)
        props.onChangeStatus(status)
        props.onClose()
    }

    return (
        <div className={styles['filters-modal']}>
            <Typography variant='h2' color='white'>Фильтры</Typography>
            <Stripe />
            <div className={styles.filters}>
                <DateFilter from={dateFrom} to={dateTo} onChoseFrom={setDateFrom} onChoseTo={setDateTo} />
                <div className={styles['filters-without-date']}>
                    {props.isReceptionistsLoading ? (
                        <div className={styles['loader-body']}>
                            <div className={styles['loader-wrapper']}>
                                <Loader />
                            </div>
                        </div>
                    ) : (
                        <StyledMultiSelectWithLabel 
                            active={chosenReceptionists} 
                            options={props.receptionists as {
                                id: string,
                                title: string
                            }[]}
                            onAdd={handleAddReceptionists}
                            onRemove={handleRemoveReceptionists}
                            label="Приемщики"
                        />
                    )}
                    <StyledSelectWithLabel 
                        active={status}
                        onChange={setStatus}
                        options={options}
                        label='Статус'
                    />
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