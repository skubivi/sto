import { FC, ReactNode } from "react"
import StyledModal from "../ui/styled-modal/styled-modal"

import FilterSvg from '../../assets/components/filter-button/filter.svg?react'

import styles from './style.module.scss'

interface IFilterButton {
    children: ReactNode
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterButton: FC<IFilterButton> = (props) => {
    return (
        <div className={styles.button} onClick={() => props.setOpen(true)}>
            {props.open &&
                <StyledModal open={props.open} onClose={() => props.setOpen(false)}>
                    {props.children}
                </StyledModal>
            }
            <FilterSvg />
        </div>
    )
}

export default FilterButton