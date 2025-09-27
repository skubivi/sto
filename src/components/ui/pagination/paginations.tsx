import { FC } from 'react'
import styles from './style.module.scss'
import Typography from '../typography/typography'
import PrevSvg from '../../../assets/components/pagination/prev.svg?react'
import NextSvg from '../../../assets/components/pagination/next.svg?react'

interface IPagination {
    page: number
    itemsOnPage: 5 | 10 | 20 | 50
    items: number
    onChangePage: React.Dispatch<React.SetStateAction<number>>
    onChangeItemsOnPage: React.Dispatch<React.SetStateAction<5 | 10 | 20 | 50>>
}

const Pagination: FC<IPagination> = (props) => {
    const minNumber = props.items > 0 ? props.page * props.itemsOnPage + 1 : 0
    const maxNumber = Math.min((props.page + 1) * props.itemsOnPage, props.items)
    const isPrevPage = props.page > 0
    const isNextPage = (props.page + 1) * props.itemsOnPage < props.items

    const handleChangeItemsOnPage = (n: 5 | 10 | 20 | 50) => {
        const prevMinNumber = props.page * props.itemsOnPage
        const newPage = Math.floor(prevMinNumber / n)
        props.onChangeItemsOnPage(n)
        props.onChangePage(newPage)
    }
    const handleNextPage = () => {
        props.onChangePage(prev => prev + 1)
    }
    const handlePrevPage = () => {
        props.onChangePage(prev => prev - 1)
    }

    return (
        <div className={styles.pagination}>
            <div className={styles['items-container']}>
                <div 
                    className={`${styles.item} ${props.itemsOnPage === 5 && styles.active}`}
                    onClick={() => handleChangeItemsOnPage(5)}
                >
                    <Typography variant='caption' color={props.itemsOnPage === 5 ? 'black' : 'secondary3'}>5</Typography>
                </div>
                <div 
                    className={`${styles.item} ${props.itemsOnPage === 10 && styles.active}`}
                    onClick={() => handleChangeItemsOnPage(10)}
                >
                    <Typography variant='caption' color={props.itemsOnPage === 10 ? 'black' : 'secondary3'}>10</Typography>
                </div>
                <div 
                    className={`${styles.item} ${props.itemsOnPage === 20 && styles.active}`}
                    onClick={() => handleChangeItemsOnPage(20)}
                >
                    <Typography variant='caption' color={props.itemsOnPage === 20 ? 'black' : 'secondary3'}>20</Typography>
                </div>
                <div 
                    className={`${styles.item} ${props.itemsOnPage === 50 && styles.active}`}
                    onClick={() => handleChangeItemsOnPage(50)}
                >
                    <Typography variant='caption' color={props.itemsOnPage === 50 ? 'black' : 'secondary3'}>50</Typography>
                </div>
            </div>
            <div className={styles['page']}>
                {isPrevPage &&
                    <div onClick={handlePrevPage} className={styles['page-button']}>
                        <PrevSvg />
                    </div>
                }
                <Typography variant='caption' color='secondary3'>{minNumber}-{maxNumber} из {props.items}</Typography>
                {isNextPage &&
                    <div onClick={handleNextPage} className={styles['page-button']}>
                        <NextSvg />
                    </div>
                }
            </div>
        </div>
    )
}

export default Pagination