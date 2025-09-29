import { FC, useState } from "react"

import styles from './style.module.scss'
import { ESign } from "../../../../../services/types/analytics"
import DateFilter from "../../../../../components/date-filter/date-filter"
import FilterButton from "../../../../../components/filter-button/filter-button"
import FilterModal from "./components/filter-modal/filter-modal"

interface ITableHeader {
    dateFrom: Date
    onChangeDateFrom: (d: Date) => void
    dateTo: Date
    onChangeDateTo: (d: Date) => void
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

const TableHeader: FC<ITableHeader> = (props) => {
    const [openFilters, setOpenFilters] = useState(false)
    return (
        <div className={styles.header}>
            <div className={styles['date-container']}>
                <DateFilter from={props.dateFrom} to={props.dateTo} onChoseFrom={props.onChangeDateFrom} onChoseTo={props.onChangeDateTo} />
            </div>
            <div className={styles['filters-container']}>
                <FilterButton open={openFilters} setOpen={setOpenFilters}>
                    <FilterModal 
                        dateFrom={props.dateFrom}
                        dateTo={props.dateTo}
                        setDateFrom={props.onChangeDateFrom}
                        setDateTo={props.onChangeDateTo}
                        onClose={() => {
                            setTimeout(() => setOpenFilters(false), 0)
                        }}
                        filials={props.filials}
                        isFilialsLoading={props.isFilialsLoading}
                        chosenFilials={props.chosenFilials}
                        setChosenFilials={props.setChosenFilials}
                        setState={props.setState}
                        state={props.state}
                    />
                </FilterButton>
            </div>
        </div>
    )
}

export default TableHeader