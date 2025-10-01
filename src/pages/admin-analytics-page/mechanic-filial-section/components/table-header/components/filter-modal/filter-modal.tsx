import { FC, useState } from "react"

import styles from './style.module.scss'
import DateFilter from "../../../../../../../components/date-filter/date-filter"
import DefaultButton from "../../../../../../../components/ui/default-button/default-button"
// import InputWithSign from "../../../../../../../components/ui/input-with-sign/input-with-sign"
import Loader from "../../../../../../../components/ui/loader/loader"
import Stripe from "../../../../../../../components/ui/stripe/stripe"
import StyledMultiSelectWithLabel from "../../../../../../../components/ui/styled-multi-select-with-label/styled-multi-select-with-label"
import Typography from "../../../../../../../components/ui/typography/typography"
import { ESign } from "../../../../../../../services/types/analytics"

interface IFilterModal {
    dateFrom: Date
    setDateFrom: (d: Date) => void
    dateTo: Date
    setDateTo: (d: Date) => void
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
        diagnosticsCount: number | undefined,
        diagnosticsCountSign: ESign,
        worksCount: number | undefined,
        worksCountSign: ESign,
        worksAverage: number | undefined,
        worksAverageSign: ESign,
        reportsCount: number | undefined,
        reporstCountSign: ESign,
    }
    setState: React.Dispatch<React.SetStateAction<{
        diagnosticsCount: number | undefined;
        diagnosticsCountSign: ESign;
        worksCount: number | undefined;
        worksCountSign: ESign;
        worksAverage: number | undefined;
        worksAverageSign: ESign;
        reportsCount: number | undefined;
        reporstCountSign: ESign;
    }>>
}

const FilterModal: FC<IFilterModal> = (props) => {
    const [dateFrom, setDateFrom] = useState(props.dateFrom)
    const [dateTo, setDateTo] = useState(props.dateTo)
    const [chosenFilials, setChosenFilials] = useState(props.chosenFilials)
    // const [diagnosticsCount, setDiagnosticsCount] = useState(props.state.diagnosticsCount)
    // const [diagnosticsCountSign, setDiagnosticsCountSign] = useState(props.state.diagnosticsCountSign)
    // const [worksCount, setWorksCount] = useState(props.state.worksCount)
    // const [worksCountSign, setWorksCountSign] = useState(props.state.worksCountSign)
    // const [worksAverage, setWorksAverage] = useState(props.state.worksAverage)
    // const [worksAverageSign, setWorksAverageSign] = useState(props.state.worksAverageSign)
    // const [reportsCount, setReportsCount] = useState(props.state.reportsCount)
    // const [reporstCountSign, setReporstCountSign] = useState(props.state.reporstCountSign)

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
        //     diagnosticsCount,
        //     diagnosticsCountSign,
        //     worksCount,
        //     worksCountSign,
        //     worksAverage,
        //     worksAverageSign,
        //     reportsCount,
        //     reporstCountSign,
        // })
        props.setChosenFilials(chosenFilials)
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
                    {props.isFilialsLoading ? (
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
                    {/* <InputWithSign 
                        label="Кол-во диагностик"
                        sign={diagnosticsCountSign}
                        value={diagnosticsCount}
                        changeSign={() => setDiagnosticsCountSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setDiagnosticsCount}
                    />
                    <InputWithSign 
                        label="Выявлено работ (шт.)"
                        sign={worksCountSign}
                        value={worksCount}
                        changeSign={() => setWorksCountSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setWorksCount}
                    />
                    <InputWithSign 
                        label="Среднее за диагностику"
                        sign={worksAverageSign}
                        value={worksAverage}
                        changeSign={() => setWorksAverageSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setWorksAverage}
                    />
                    <InputWithSign 
                        label="Отчетов по готовым работам"
                        sign={reporstCountSign}
                        value={reportsCount}
                        changeSign={() => setReporstCountSign(prev => prev === ESign.More ? ESign.Less : ESign.More)}
                        setValue={setReportsCount}
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