import { FC, useState } from "react"
import { ESign } from "../../../../../../../services/types/analytics"
import { useGetMeQuery } from "../../../../../../../services/api/user"

import styles from './style.module.scss'

import Typography from "../../../../../../../components/ui/typography/typography"
import Stripe from "../../../../../../../components/ui/stripe/stripe"
import DateFilter from "../../../../../../../components/date-filter/date-filter"
import StyledMultiSelectWithLabel from "../../../../../../../components/ui/styled-multi-select-with-label/styled-multi-select-with-label"
import { ERoles } from "../../../../../../../services/types/user"
import Loader from "../../../../../../../components/ui/loader/loader"
// import InputWithSign from "../../../../../../../components/ui/input-with-sign/input-with-sign"
import DefaultButton from "../../../../../../../components/ui/default-button/default-button"

interface IFilterModal {
    dateFrom: Date
    setDateFrom: (d: Date) => void
    dateTo: Date
    setDateTo: (d: Date) => void
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
    filials: {
        id: string,
        title: string
    }[] | undefined
    isFilialsLoading: boolean
    chosenFilials: {
        id: string,
        title: string
    }[]
    setChosenFilials: React.Dispatch<React.SetStateAction<{
        id: string;
        title: string;
    }[]>>
    onClose: () => void
    state: {
        carsCount: number | undefined,
        carsCountSign: ESign,
        carsProcessed: number | undefined,
        carsProcessedSign: ESign,
        processedPercent: number | undefined,
        processedPercentSign: ESign,
        carsGivenAway: number | undefined,
        carsGivenAwaySign: ESign,
        reportsGivenAway: number | undefined,
        reportsGivenAwaySign: ESign,
        reportsPercent: number | undefined,
        reportsPercentSign: ESign,
    }
    setState: React.Dispatch<React.SetStateAction<{
        carsCount: number | undefined,
        carsCountSign: ESign,
        carsProcessed: number | undefined,
        carsProcessedSign: ESign,
        processedPercent: number | undefined,
        processedPercentSign: ESign,
        carsGivenAway: number | undefined,
        carsGivenAwaySign: ESign,
        reportsGivenAway: number | undefined,
        reportsGivenAwaySign: ESign,
        reportsPercent: number | undefined,
        reportsPercentSign: ESign,
    }>>
}

const FilterModal: FC<IFilterModal> = (props) => {
    const [dateFrom, setDateFrom] = useState(props.dateFrom)
    const [dateTo, setDateTo] = useState(props.dateTo)
    const [chosenFilials, setChosenFilials] = useState(props.chosenFilials)
    const [chosenReceptionists, setChosenReceptionists] = useState(props.chosenReceptionists)
    // const [carsCount, setCarsCount] = useState(props.state.carsCount)
    // const [carsCountSign, setCarsCountSign] = useState(props.state.carsCountSign)
    // const [carsProcessed, setCarsProcessed] = useState(props.state.carsProcessed)
    // const [carsProcessedSign, setCarsProcessedSign] = useState(props.state.carsProcessedSign)
    // const [processedPercent, setProcessedPercent] = useState(props.state.processedPercent)
    // const [processedPercentSign, setProcessedPercentSign] = useState(props.state.processedPercentSign)
    // const [carsGivenAway, setCarsGivenAway] = useState(props.state.carsGivenAway)
    // const [carsGivenAwaySign, setCarsGivenAwaySign] = useState(props.state.carsGivenAwaySign)
    // const [reportsGivenAway, setReportsGivenAway] = useState(props.state.reportsGivenAway)
    // const [reportsGivenAwaySign, setReportsGivenAwaySign] = useState(props.state.reportsGivenAwaySign)
    // const [reportsPercent, setReportsPercent] = useState(props.state.reportsPercent)
    // const [reportsPercentSign, setReportsPercentSign] = useState(props.state.reportsPercentSign)

    const { data: me } = useGetMeQuery()

    const handleAddReceptionist = (id: string) => {
        const mechanic = props.receptionists?.find(el => el.id === id)
        if (!mechanic) return
        setChosenReceptionists(prev => {
            if (prev.findIndex(el => el.id === id) === -1) {
                return [...prev, {id: mechanic.id, title: mechanic.title}]
            }
            return prev
        })
    }
    const handleRemoveReceptionist = (id: string) => {
        setChosenReceptionists(prev => {
            const index = prev.findIndex(el => el.id === id)
            if (index === -1) return prev
            return [...prev.slice(0, index), ...prev.slice(index + 1)]
        })
    }
    const handleAddFilial = (id: string) => {
        const filial = props.filials?.find(el => el.id === id)
        if (!filial) return
        setChosenFilials(prev => {
            if (prev.findIndex(el => el.id === id) === -1) {
                return [...prev, {id: filial.id, title: filial.title}]
            }
            return prev
        })
    }
    const handleRemoveFilial = (id: string) => {
        setChosenFilials(prev => {
            const index = prev.findIndex(el => el.id === id)
            if (index === -1) return prev
            return [...prev.slice(0, index), ...prev.slice(index + 1)]
        })
    }

    const handleSubmit = () => {
        // props.setState({
        //     carsCount,
        //     carsCountSign,
        //     carsProcessed,
        //     carsProcessedSign,
        //     processedPercent,
        //     processedPercentSign,
        //     carsGivenAway,
        //     carsGivenAwaySign,
        //     reportsGivenAway,
        //     reportsGivenAwaySign,
        //     reportsPercent,
        //     reportsPercentSign,
        // })
        props.setChosenFilials(chosenFilials)
        props.setChosenReceptionists(chosenReceptionists)
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
                    {me?.role === ERoles.Admin ? null :
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
                                    id: string,
                                    title: string
                                }[]}
                                onAdd={handleAddFilial}
                                onRemove={handleRemoveFilial}
                                label="Станции"
                            />
                        )
                    }
                    {
                        props.isReceptionistsLoading ? (
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
                                onAdd={handleAddReceptionist}
                                onRemove={handleRemoveReceptionist}
                                label="Приемщики"
                            />
                        )
                    }
                    {/* <InputWithSign 
                        label="Машин принято"
                        sign={carsCountSign}
                        value={carsCount}
                        changeSign={() => setCarsCountSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setCarsCount}
                    />
                    <InputWithSign 
                        label="Машин осмотрено"
                        sign={carsProcessedSign}
                        value={carsProcessed}
                        changeSign={() => setCarsProcessedSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setCarsProcessed}
                    />
                    <InputWithSign 
                        label="% осмотров"
                        sign={processedPercentSign}
                        value={processedPercent}
                        changeSign={() => setProcessedPercentSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setProcessedPercent}
                        isPercent
                    />
                    <InputWithSign 
                        label="Машин отдано"
                        sign={carsGivenAwaySign}
                        value={carsGivenAway}
                        changeSign={() => setCarsGivenAwaySign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setCarsGivenAway}
                    />
                    <InputWithSign 
                        label="Отправлено осмотров по готовым машинам"
                        sign={reportsGivenAwaySign}
                        value={reportsGivenAway}
                        changeSign={() => setReportsGivenAwaySign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setReportsGivenAway}
                    />
                    <InputWithSign 
                        label="% отчетов от отданых"
                        sign={reportsPercentSign}
                        value={reportsPercent}
                        changeSign={() => setReportsPercentSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setReportsPercent}
                        isPercent
                    /> */}
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